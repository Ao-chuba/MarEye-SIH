"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Upload, 
  Play, 
  Download, 
  Image as ImageIcon, 
  Video, 
  Cpu, 
  Zap, 
  Target,
  BarChart3,
  Settings,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  Trash2,
  Rocket
} from "lucide-react"

interface ProcessingResult {
  type?: "image" | "video"
  originalImage?: string
  enhancedImage?: string
  originalVideo?: string
  originalVideoDownload?: string
  enhancedVideo?: string
  enhancedVideoDownload?: string
  metrics: {
    psnr: number
    ssim: number
    uiqm_original: number
    uiqm_enhanced: number
    uiqm_improvement: number
  }
  processingTime: number
  videoInfo?: {
    framesProcessed: number
    fps: number
    duration: number
    codecUsed?: string
    enhancementMethod?: string
  }
  videoError?: boolean
}

export default function JetsonPage() {
  // COMMENTED OUT: Original processing functionality - now redirects to external URL
  // const [isProcessing, setIsProcessing] = useState(false)
  // const [processingProgress, setProcessingProgress] = useState(0)
  // const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const [results, setResults] = useState<ProcessingResult[]>([])
  // const [activeTab, setActiveTab] = useState("image")
  // const [isVideoProcessing, setIsVideoProcessing] = useState(false)
  // const [videoErrors, setVideoErrors] = useState<Set<number>>(new Set())
  // const fileInputRef = useRef<HTMLInputElement>(null)

  // COMMENTED OUT: Original useEffect hooks and processing functions
  // useEffect(() => { ... })
  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => { ... }
  // const processImage = async () => { ... }
  // const processVideo = async () => { ... }
  // const handleDeleteResult = (index: number) => { ... }
  // const handleVideoError = (index: number) => { ... }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-950 relative">
      
      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/30 to-red-500/30 rounded-2xl flex items-center justify-center mr-4">
                <Rocket className="w-8 h-8 text-orange-300" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white bg-gradient-to-r from-orange-300 to-red-300 bg-clip-text text-transparent">
                Jetson ONNX
              </h1>
            </div>
            <p className="text-xl text-orange-200 max-w-3xl mx-auto leading-relaxed">
              High-performance ONNX model optimized for NVIDIA Jetson devices. 
              Ultra-fast underwater image and video enhancement with TensorRT acceleration for real-time marine security operations.
            </p>
          </div>

          {/* Redirect Message */}
          <div className="text-center mb-12">
            <div className="bg-slate-900/40 backdrop-blur-md border border-orange-500/30 rounded-3xl p-8 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400/30 to-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Rocket className="w-8 h-8 text-orange-300" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Jetson Processing Moved
              </h2>
              <p className="text-orange-200 mb-6 leading-relaxed">
                The Jetson ONNX image and video processing functionality has been moved to our enhanced platform. 
                Click the button below to access the new processing interface.
              </p>
              <a 
                href="https://enhancement-pipeline.streamlit.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30 hover:scale-105"
              >
                Access Jetson Processing →
              </a>
            </div>
          </div>

          {/* Model Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Zap className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">15+ FPS</div>
                <div className="text-sm text-orange-300">Processing Speed</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">512×512</div>
                <div className="text-sm text-orange-300">Input Resolution</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">7.7MB</div>
                <div className="text-sm text-orange-300">Model Size</div>
              </CardContent>
            </Card>
            <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Cpu className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">ONNX</div>
                <div className="text-sm text-orange-300">Runtime</div>
              </CardContent>
            </Card>
          </div>

          {/* COMMENTED OUT: Main Processing Interface - functionality moved to external URL */}
          {/* <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-900/40 backdrop-blur-md border border-orange-500/30">
              <TabsTrigger value="image" className="flex items-center space-x-2">
                <ImageIcon className="w-4 h-4" />
                <span>Image Enhancement</span>
              </TabsTrigger>
              <TabsTrigger value="video" className="flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Video Processing</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="image" className="mt-6">
              <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <ImageIcon className="w-5 h-5 text-orange-400" />
                    <span>Image Enhancement</span>
                  </CardTitle>
                  <CardDescription className="text-orange-300">
                    Upload an underwater image to enhance its clarity, color, and overall quality using our optimized ONNX model.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-orange-500/30 rounded-xl p-8 text-center hover:border-orange-400/50 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Upload className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Click to upload an image or drag and drop</p>
                    <p className="text-sm text-orange-300 mb-4">Supports JPG, PNG, BMP formats</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-orange-400/50 text-orange-300 hover:bg-orange-400/10"
                    >
                      Choose File
                    </Button>
                    {selectedFile && (
                      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-sm text-white">Selected: {selectedFile.name}</p>
                        <p className="text-xs text-orange-300">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}
                  </div>

                  {/* Processing Controls */}
                  <div className="flex justify-center">
                    <Button
                      onClick={processImage}
                      disabled={!selectedFile || isProcessing}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-3 rounded-xl font-semibold"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Enhance Image
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-orange-300">
                        <span>Processing...</span>
                        <span>{Math.round(processingProgress)}%</span>
                      </div>
                      <Progress value={processingProgress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="video" className="mt-6">
              <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-white flex items-center space-x-2">
                    <Video className="w-5 h-5 text-orange-400" />
                    <span>Video Processing</span>
                  </CardTitle>
                  <CardDescription className="text-orange-300">
                    Upload an underwater video to enhance all frames using our ONNX model with TensorRT acceleration.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-orange-500/30 rounded-xl p-8 text-center hover:border-orange-400/50 transition-colors">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Video className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <p className="text-white mb-2">Click to upload a video or drag and drop</p>
                    <p className="text-sm text-orange-300 mb-4">Supports MP4, AVI, MOV, MKV formats</p>
                    <Button
                      onClick={() => fileInputRef.current?.click()}
                      variant="outline"
                      className="border-orange-400/50 text-orange-300 hover:bg-orange-400/10"
                    >
                      Choose Video
                    </Button>
                    {selectedFile && (
                      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
                        <p className="text-sm text-white">Selected: {selectedFile.name}</p>
                        <p className="text-xs text-orange-300">Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}
                  </div>

                  {/* Processing Controls */}
                  <div className="flex justify-center">
                    <Button
                      onClick={processVideo}
                      disabled={!selectedFile || isProcessing}
                      className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-8 py-3 rounded-xl font-semibold"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Process Video
                        </>
                      )}
                    </Button>
                  </div>

                  {/* Processing Progress */}
                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-orange-300">
                        <span>Processing video frames...</span>
                        <span>{Math.round(processingProgress)}%</span>
                      </div>
                      <Progress value={processingProgress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
                <span>Processing Results</span>
              </h2>
              
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Card key={index} className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Images/Videos */}
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white mb-2">Original</h3>
                            {result.type === "video" ? (
                              <video 
                                src={result.originalVideo} 
                                controls
                                className="w-full h-48 object-cover rounded-lg border border-orange-500/30"
                              >
                                Your browser does not support the video tag.
                              </video>
                            ) : (
                              <img 
                                src={result.originalImage} 
                                alt="Original" 
                                className="w-full h-48 object-cover rounded-lg border border-orange-500/30"
                              />
                            )}
                          </div>
         <div>
           <h3 className="text-lg font-semibold text-white mb-2">Enhanced</h3>
           {result.type === "video" ? (
             <div>
               <div className="relative">
                 {result.enhancedVideo ? (
                   videoErrors.has(index) ? (
                     <div className="w-full h-48 bg-gray-800 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400">
                       <div className="text-center">
                         <p className="text-sm">Video playback failed</p>
                         <p className="text-xs mt-1">Codec: {result.videoInfo?.codecUsed || 'Unknown'}</p>
                         {result.metrics?.uiqm_improvement < 0 ? (
                           <p className="text-xs mt-1 text-yellow-400">⚠ Model may be degrading quality</p>
                         ) : (
                           <p className="text-xs mt-1 text-green-400">✓ Enhancement successful!</p>
                         )}
                         <p className="text-xs mt-1">Use download button below</p>
                       </div>
                     </div>
                   ) : (
                     <video 
                       key={`video-${index}`}
                       controls
                       preload="auto"
                       playsInline
                       className="w-full h-48 object-cover rounded-lg border border-emerald-500/30"
                       onError={(e) => {
                         const videoElement = e.currentTarget
                         const error = videoElement.error
                         console.error("Video error:", {
                           code: error?.code,
                           message: error?.message,
                           src: result.enhancedVideo,
                           codec: result.videoInfo?.codecUsed
                         })
                         handleVideoError(index)
                       }}
                       onLoadedMetadata={() => {
                         console.log("Video metadata loaded successfully")
                         console.log("Codec:", result.videoInfo?.codecUsed)
                       }}
                       onCanPlay={() => console.log("Video can play")}
                       onLoadStart={() => console.log("Video load started")}
                     >
                       <source src={result.enhancedVideo} type="video/mp4" />
                       <source src={result.enhancedVideo} type="video/mp4; codecs=avc1" />
                       Your browser does not support the video tag or the video codec.
                     </video>
                   )
                 ) : (
                   <div className="w-full h-48 bg-gray-800 rounded-lg border border-red-500/30 flex items-center justify-center text-red-400">
                     <div className="text-center">
                       <p className="text-sm">Enhanced video not available</p>
                       <p className="text-xs mt-1">Please try processing again</p>
                     </div>
                   </div>
                 )}
               </div>
               <div className="text-xs text-gray-400 mt-1">
                 Video URL length: {result.enhancedVideo ? result.enhancedVideo.length : "No URL"}
                 {result.videoInfo?.codecUsed && (
                   <div>Codec: {result.videoInfo.codecUsed}</div>
                 )}
               </div>
               <div className="mt-2">
                 <a 
                   href={result.enhancedVideo} 
                   download={`enhanced_${result.originalFileName || 'video.mp4'}`}
                   className="inline-block px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded"
                 >
                   Download Enhanced Video
                 </a>
               </div>
             </div>
           ) : (
             <img 
               src={result.enhancedImage} 
               alt="Enhanced" 
               className="w-full h-48 object-cover rounded-lg border border-emerald-500/30"
             />
           )}
         </div>
                        </div>

                        {/* Metrics */}
                        <div className="space-y-4">
                          <h3 className="text-lg font-semibold text-white mb-4">Quality Metrics</h3>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <div className="text-sm text-orange-300 mb-1">PSNR</div>
                              <div className="text-2xl font-bold text-white">{(result.metrics.psnr || 0).toFixed(2)} dB</div>
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {(result.metrics.psnr || 0) > 20 ? "Good" : "Low"}
                              </Badge>
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <div className="text-sm text-orange-300 mb-1">SSIM</div>
                              <div className="text-2xl font-bold text-white">{(result.metrics.ssim || 0).toFixed(4)}</div>
                              <Badge variant="secondary" className="mt-1 text-xs">
                                {(result.metrics.ssim || 0) > 0.8 ? "High" : "Moderate"}
                              </Badge>
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <div className="text-sm text-orange-300 mb-1">UIQM Original</div>
                              <div className="text-2xl font-bold text-white">{(result.metrics.uiqm_original || 0).toFixed(2)}</div>
                            </div>
                            
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <div className="text-sm text-orange-300 mb-1">UIQM Enhanced</div>
                              <div className="text-2xl font-bold text-white">{(result.metrics.uiqm_enhanced || 0).toFixed(2)}</div>
                            </div>
                          </div>

                          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 border border-orange-500/30">
                            <div className="text-sm text-orange-300 mb-1">UIQM Improvement</div>
                            <div className="text-2xl font-bold text-orange-400">
                              {(result.metrics.uiqm_improvement || 0) >= 0 ? '+' : ''}{(result.metrics.uiqm_improvement || 0).toFixed(2)}
                            </div>
                            <div className="text-xs text-orange-300 mt-1">
                              {(result.metrics.uiqm_improvement || 0) > 0 ? "Enhancement successful" : "Enhancement failed"}
                            </div>
                          </div>

                          {/* Video Info */}
                          {result.type === "video" && result.videoInfo && (
                            <div className="bg-slate-800/50 rounded-lg p-4">
                              <h4 className="text-sm font-semibold text-orange-300 mb-2">Video Information</h4>
                              <div className="grid grid-cols-3 gap-2 text-xs">
                                <div>
                                  <div className="text-slate-400">Frames</div>
                                  <div className="text-white font-semibold">{result.videoInfo.framesProcessed}</div>
                                </div>
                                <div>
                                  <div className="text-slate-400">FPS</div>
                                  <div className="text-white font-semibold">{result.videoInfo.fps}</div>
                                </div>
                                <div>
                                  <div className="text-slate-400">Duration</div>
                                  <div className="text-white font-semibold">{result.videoInfo.duration.toFixed(1)}s</div>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                            <div className="text-sm text-orange-300">
                              Processing time: {(result.processingTime || 0).toFixed(3)}s
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-orange-400/50 text-orange-300 hover:bg-orange-400/10"
                                onClick={() => {
                                  const link = document.createElement('a')
                                  if (result.type === 'video') {
                                    // Use the download URL with base64 data
                                    link.href = result.enhancedVideoDownload || result.enhancedVideo || ''
                                    link.download = `enhanced_video_${Date.now()}.mp4`
                                  } else {
                                    link.href = result.enhancedImage || ''
                                    link.download = `enhanced_image_${Date.now()}.png`
                                  }
                                  link.click()
                                }}
                              >
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-red-400/50 text-red-300 hover:bg-red-400/10"
                                onClick={() => handleDeleteResult(index)}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          */}

          {/* Model Information */}
          <div className="mt-12">
            <Card className="bg-slate-900/40 backdrop-blur-md border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-orange-400" />
                  <span>Model Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">ONNX Runtime Details</h4>
                    <ul className="space-y-2 text-orange-300">
                      <li>• <strong className="text-white">Model:</strong> ONNX Optimized U-Net</li>
                      <li>• <strong className="text-white">Input Size:</strong> 512×512 pixels</li>
                      <li>• <strong className="text-white">Channels:</strong> 3 (RGB)</li>
                      <li>• <strong className="text-white">Runtime:</strong> ONNX Runtime with TensorRT</li>
                      <li>• <strong className="text-white">Training Data:</strong> EUVP dataset (5885 images)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Performance Metrics</h4>
                    <ul className="space-y-2 text-orange-300">
                      <li>• <strong className="text-white">Jetson Inference:</strong> ~65ms per image</li>
                      <li>• <strong className="text-white">ONNX Runtime:</strong> ~80ms per image</li>
                      <li>• <strong className="text-white">Model Size:</strong> 7.7MB (ONNX)</li>
                      <li>• <strong className="text-white">Memory Usage:</strong> ~150MB</li>
                      <li>• <strong className="text-white">Edge Ready:</strong> Jetson Nano, Xavier, Orin</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
