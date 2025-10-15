# Dummy API Implementation

This document explains the dummy API implementation for CNN and Jetson (ONNX) image/video enhancement.

## Overview

The dummy APIs simulate real model processing by:
1. Accepting uploaded files
2. Simulating processing delays (4 seconds for images, 10 seconds for videos)
3. Returning hardcoded metrics and results from predefined directories
4. Using files from `CNN/` and `onxx/` directories as "enhanced" outputs

## Directory Structure

```
Oceanova---SIH/
├── CNN/                    # CNN dummy results
│   ├── 1.mp4              # Original video
│   ├── 2.mp4              # Enhanced video
│   ├── 11.jpg             # Original image
│   └── 22.jpg             # Enhanced image
├── onxx/                   # ONNX/Jetson dummy results
│   ├── ss1.mp4            # Original video
│   ├── ss2.mp4            # Enhanced video
│   ├── 1.png              # Original image
│   └── 2.png              # Enhanced image
└── app/api/
    ├── cnn/dummy/         # Dummy CNN API
    └── jetson/dummy/      # Dummy Jetson API
```

## API Endpoints

### CNN Dummy API
- **URL**: `/api/cnn/dummy`
- **Method**: POST
- **Parameters**: 
  - `file`: Uploaded image/video file
  - `type`: "image" or "video"
- **Processing Time**: 4 seconds (images), 10 seconds (videos)
- **Source Directory**: `CNN/`

### Jetson Dummy API
- **URL**: `/api/jetson/dummy`
- **Method**: POST
- **Parameters**: 
  - `file`: Uploaded image/video file
  - `type`: "image" or "video"
- **Processing Time**: 4 seconds (images), 10 seconds (videos)
- **Source Directory**: `onxx/`

## Hardcoded Metrics

### CNN Metrics
- **PSNR**: 22.45-25.45 dB (random)
- **SSIM**: 0.8756-0.9256 (random)
- **UIQM Improvement**: 66.78-76.78 (random)
- **Processing Time**: 4.0-4.5 seconds (images), 10.0-11.0 seconds (videos)

### Jetson/ONNX Metrics (Better Performance)
- **PSNR**: 25.67-29.67 dB (random, better than CNN)
- **SSIM**: 0.9123-0.9523 (random, better than CNN)
- **UIQM Improvement**: 100.21-120.21 (random, better than CNN)
- **Processing Time**: 0.065-0.085 seconds (much faster than CNN)

## Usage

### Testing with Web Interface
1. Start the development server: `npm run dev`
2. Navigate to:
   - CNN Page: http://localhost:3000/cnn-model
   - Jetson Page: http://localhost:3000/jetson
3. Upload an image or video
4. Wait for processing (4s for images, 10s for videos)
5. View the "enhanced" result from the respective directory

### Testing with API
```bash
# Test CNN image enhancement
curl -X POST -F "file=@test_image.jpg" -F "type=image" http://localhost:3000/api/cnn/dummy

# Test Jetson image enhancement
curl -X POST -F "file=@test_image.jpg" -F "type=image" http://localhost:3000/api/jetson/dummy

# Test CNN video enhancement
curl -X POST -F "file=@test_video.mp4" -F "type=video" http://localhost:3000/api/cnn/dummy

# Test Jetson video enhancement
curl -X POST -F "file=@test_video.mp4" -F "type=video" http://localhost:3000/api/jetson/dummy
```

### Testing with Python Script
```bash
python test_dummy_apis.py
```

## File Selection Logic

The dummy APIs use specific files from their respective directories:
- **CNN API**: 
  - Images: Uses `CNN/22.jpg` (enhanced) for the enhanced section
  - Videos: Uses `CNN/2.mp4` (enhanced) for the enhanced section
- **Jetson API**: 
  - Images: Uses `onxx/2.png` (enhanced) for the enhanced section
  - Videos: Uses `onxx/ss2.mp4` (enhanced) for the enhanced section

**Note**: Files containing "2" are used as the enhanced versions, while files containing "1" represent the original versions.

## Switching Back to Real APIs

To switch back to the real model processing:

1. **CNN Page**: Change `/api/cnn/dummy` back to `/api/cnn/process` in `app/cnn-model/page.tsx`
2. **Jetson Page**: Change `/api/jetson/dummy` back to `/api/jetson/process` in `app/jetson/page.tsx`

## Notes

- The dummy APIs preserve all the original functionality and UI behavior
- Processing progress bars work correctly with the simulated delays
- All metrics and video information are displayed as expected
- The real model processing code remains untouched in the original API endpoints
- This implementation allows for easy testing and demonstration without requiring actual model inference
