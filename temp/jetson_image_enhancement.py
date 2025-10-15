
import cv2
import numpy as np
import os
import time
import json
import onnxruntime as ort
from skimage.metrics import peak_signal_noise_ratio as psnr
from skimage.metrics import structural_similarity as ssim

def enhance_image_onnx(input_path, output_path, model_path):
    """Enhance image using ONNX model"""
    start_time = time.time()
    
    # Read the original image
    original = cv2.imread(input_path)
    if original is None:
        return {'error': 'Could not read input image'}
    
    # Resize to model input size (512x512)
    input_size = (512, 512)
    resized = cv2.resize(original, input_size)
    
    # Normalize to [0, 1] and convert to float32
    input_tensor = resized.astype(np.float32) / 255.0
    
    # Convert BGR to RGB
    input_tensor = cv2.cvtColor(input_tensor, cv2.COLOR_BGR2RGB)
    
    # Add batch dimension and transpose to CHW format
    input_tensor = np.transpose(input_tensor, (2, 0, 1))
    input_tensor = np.expand_dims(input_tensor, axis=0)
    
    try:
        # Load ONNX model
        session = ort.InferenceSession(model_path)
        
        # Get input and output names
        input_name = session.get_inputs()[0].name
        output_name = session.get_outputs()[0].name
        
        # Run inference
        outputs = session.run([output_name], {input_name: input_tensor})
        enhanced_tensor = outputs[0]
        
        # Post-process output
        # Remove batch dimension and transpose back to HWC
        enhanced_tensor = np.squeeze(enhanced_tensor, axis=0)
        enhanced_tensor = np.transpose(enhanced_tensor, (1, 2, 0))
        
        # Convert RGB to BGR
        enhanced_tensor = cv2.cvtColor(enhanced_tensor, cv2.COLOR_RGB2BGR)
        
        # Denormalize and clip values
        enhanced_tensor = np.clip(enhanced_tensor * 255.0, 0, 255).astype(np.uint8)
        
        # Resize back to original size
        enhanced = cv2.resize(enhanced_tensor, (original.shape[1], original.shape[0]))
        
    except Exception as e:
        print(f"ONNX inference failed: {e}")
        # Fallback to OpenCV enhancement
        enhanced = enhance_image_opencv_fallback(original)
    
    # Save enhanced image
    cv2.imwrite(output_path, enhanced)
    
    # Calculate metrics
    processing_time = time.time() - start_time
    
    # Convert to grayscale for SSIM calculation
    original_gray = cv2.cvtColor(original, cv2.COLOR_BGR2GRAY)
    enhanced_gray = cv2.cvtColor(enhanced, cv2.COLOR_BGR2GRAY)
    
    # Calculate PSNR
    psnr_value = psnr(original_gray, enhanced_gray)
    
    # Calculate SSIM
    ssim_value = ssim(original_gray, enhanced_gray)
    
    # Calculate UIQM (Underwater Image Quality Measure)
    def calculate_uiqm(img):
        # Convert to float
        img_float = img.astype(np.float32) / 255.0
        
        # Calculate contrast (standard deviation)
        contrast = np.std(img_float)
        
        # Calculate saturation
        hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
        saturation = np.mean(hsv[:,:,1]) / 255.0
        
        # Calculate sharpness (using Laplacian variance)
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        sharpness = cv2.Laplacian(gray, cv2.CV_64F).var()
        
        # Calculate colorfulness
        b, g, r = cv2.split(img)
        colorfulness = np.sqrt(np.var(r) + np.var(g) + np.var(b)) / 255.0
        
        # Combine metrics (simplified UIQM)
        uiqm = (contrast * 100) + (saturation * 50) + (sharpness / 100) + (colorfulness * 25)
        return uiqm
    
    uiqm_original = calculate_uiqm(original)
    uiqm_enhanced = calculate_uiqm(enhanced)
    uiqm_improvement = uiqm_enhanced - uiqm_original
    
    return {
        'psnr': psnr_value,
        'ssim': ssim_value,
        'uiqm_original': uiqm_original,
        'uiqm_enhanced': uiqm_enhanced,
        'uiqm_improvement': uiqm_improvement,
        'processing_time': processing_time
    }

def enhance_image_opencv_fallback(img):
    """Fallback OpenCV enhancement if ONNX fails"""
    # Apply CLAHE (Contrast Limited Adaptive Histogram Equalization)
    lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    l, a, b = cv2.split(lab)
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8,8))
    l = clahe.apply(l)
    enhanced_lab = cv2.merge([l, a, b])
    enhanced = cv2.cvtColor(enhanced_lab, cv2.COLOR_LAB2BGR)
    
    # Apply bilateral filter for noise reduction
    enhanced = cv2.bilateralFilter(enhanced, 9, 75, 75)
    
    # Apply unsharp masking for sharpening
    gaussian = cv2.GaussianBlur(enhanced, (0, 0), 2.0)
    enhanced = cv2.addWeighted(enhanced, 1.5, gaussian, -0.5, 0)
    
    return enhanced

if __name__ == "__main__":
    import sys
    if len(sys.argv) >= 4:
        input_path = sys.argv[1]
        output_path = sys.argv[2]
        model_path = sys.argv[3]
    else:
        input_path = "D:\MAREYE-frontend(no modules, .next,venv)\Oceanova---SIH\temp\input\auv.jpg"
        output_path = "D:\MAREYE-frontend(no modules, .next,venv)\Oceanova---SIH\temp\output\jetson_enhanced_auv.jpg"
        model_path = "D:\MAREYE-frontend(no modules, .next,venv)\Oceanova---SIH\Deep_Sea-NN-main\onnx_models\mareye_standard.onnx"
    
    result = enhance_image_onnx(input_path, output_path, model_path)
    print(json.dumps(result))
