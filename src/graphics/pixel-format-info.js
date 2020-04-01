Object.assign(pc, function () {
    'use strict';

    /**
     * @class
     * @name pc.GraphicsDevice
     * @classdesc //
     */
    var GraphicsDevice = function () {
    };

    Object.assign(GraphicsDevice.prototype, {

        initializeTexture: function (texture) {
            var gl = this.gl;

            switch (texture._format) {
                case pc.PIXELFORMAT_A8:
                    texture._glFormat = gl.ALPHA;
                    texture._glInternalFormat = gl.ALPHA;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_L8:
                    texture._glFormat = gl.LUMINANCE;
                    texture._glInternalFormat = gl.LUMINANCE;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_L8_A8:
                    texture._glFormat = gl.LUMINANCE_ALPHA;
                    texture._glInternalFormat = gl.LUMINANCE_ALPHA;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_R5_G6_B5:
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = gl.RGB;
                    texture._glPixelType = gl.UNSIGNED_SHORT_5_6_5;
                    break;
                case pc.PIXELFORMAT_R5_G5_B5_A1:
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = gl.RGBA;
                    texture._glPixelType = gl.UNSIGNED_SHORT_5_5_5_1;
                    break;
                case pc.PIXELFORMAT_R4_G4_B4_A4:
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = gl.RGBA;
                    texture._glPixelType = gl.UNSIGNED_SHORT_4_4_4_4;
                    break;
                case pc.PIXELFORMAT_R8_G8_B8:
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = this.webgl2 ? gl.RGB8 : gl.RGB;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_R8_G8_B8_A8:
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = this.webgl2 ? gl.RGBA8 : gl.RGBA;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_DXT1:
                    ext = this.extCompressedTextureS3TC;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
                    break;
                case pc.PIXELFORMAT_DXT3:
                    ext = this.extCompressedTextureS3TC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
                    break;
                case pc.PIXELFORMAT_DXT5:
                    ext = this.extCompressedTextureS3TC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                    break;
                case pc.PIXELFORMAT_ETC1:
                    ext = this.extCompressedTextureETC1;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB_ETC1_WEBGL;
                    break;
                case pc.PIXELFORMAT_PVRTC_2BPP_RGB_1:
                    ext = this.extCompressedTexturePVRTC;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                    break;
                case pc.PIXELFORMAT_PVRTC_2BPP_RGBA_1:
                    ext = this.extCompressedTexturePVRTC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                    break;
                case pc.PIXELFORMAT_PVRTC_4BPP_RGB_1:
                    ext = this.extCompressedTexturePVRTC;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                    break;
                case pc.PIXELFORMAT_PVRTC_4BPP_RGBA_1:
                    ext = this.extCompressedTexturePVRTC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                    break;
                case pc.PIXELFORMAT_ETC2_RGB:
                    ext = this.extCompressedTextureETC;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB8_ETC2;
                    break;
                case pc.PIXELFORMAT_ETC2_RGBA:
                    ext = this.extCompressedTextureETC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA8_ETC2_EAC;
                    break;
                case pc.PIXELFORMAT_ASTC_4x4:
                    ext = this.extCompressedTextureASTC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_ASTC_4x4_KHR;
                    break;
                case pc.PIXELFORMAT_ATC_RGB:
                    ext = this.extCompressedTextureATC;
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = ext.COMPRESSED_RGB_ATC_WEBGL;
                    break;
                case pc.PIXELFORMAT_ATC_RGBA:
                    ext = this.extCompressedTextureATC;
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = ext.COMPRESSED_RGBA_ATC_INTERPOLATED_ALPHA_WEBGL;
                    break;
                case pc.PIXELFORMAT_RGB16F:
                    // definition varies between WebGL1 and 2
                    ext = this.extTextureHalfFloat;
                    texture._glFormat = gl.RGB;
                    if (this.webgl2) {
                        texture._glInternalFormat = gl.RGB16F;
                        texture._glPixelType = gl.HALF_FLOAT;
                    } else {
                        texture._glInternalFormat = gl.RGB;
                        texture._glPixelType = ext.HALF_FLOAT_OES;
                    }
                    break;
                case pc.PIXELFORMAT_RGBA16F:
                    // definition varies between WebGL1 and 2
                    ext = this.extTextureHalfFloat;
                    texture._glFormat = gl.RGBA;
                    if (this.webgl2) {
                        texture._glInternalFormat = gl.RGBA16F;
                        texture._glPixelType = gl.HALF_FLOAT;
                    } else {
                        texture._glInternalFormat = gl.RGBA;
                        texture._glPixelType = ext.HALF_FLOAT_OES;
                    }
                    break;
                case pc.PIXELFORMAT_RGB32F:
                    // definition varies between WebGL1 and 2
                    texture._glFormat = gl.RGB;
                    if (this.webgl2) {
                        texture._glInternalFormat = gl.RGB32F;
                    } else {
                        texture._glInternalFormat = gl.RGB;
                    }
                    texture._glPixelType = gl.FLOAT;
                    break;
                case pc.PIXELFORMAT_RGBA32F:
                    // definition varies between WebGL1 and 2
                    texture._glFormat = gl.RGBA;
                    if (this.webgl2) {
                        texture._glInternalFormat = gl.RGBA32F;
                    } else {
                        texture._glInternalFormat = gl.RGBA;
                    }
                    texture._glPixelType = gl.FLOAT;
                    break;
                case pc.PIXELFORMAT_R32F: // WebGL2 only
                    texture._glFormat = gl.RED;
                    texture._glInternalFormat = gl.R32F;
                    texture._glPixelType = gl.FLOAT;
                    break;
                case pc.PIXELFORMAT_DEPTH:
                    if (this.webgl2) {
                        // native WebGL2
                        texture._glFormat = gl.DEPTH_COMPONENT;
                        texture._glInternalFormat = gl.DEPTH_COMPONENT32F; // should allow 16/24 bits?
                        texture._glPixelType = gl.FLOAT;
                    } else {
                        // using WebGL1 extension
                        texture._glFormat = gl.DEPTH_COMPONENT;
                        texture._glInternalFormat = gl.DEPTH_COMPONENT;
                        texture._glPixelType = gl.UNSIGNED_SHORT; // the only acceptable value?
                    }
                    break;
                case pc.PIXELFORMAT_DEPTHSTENCIL: // WebGL2 only
                    texture._glFormat = gl.DEPTH_STENCIL;
                    texture._glInternalFormat = gl.DEPTH24_STENCIL8;
                    texture._glPixelType = gl.UNSIGNED_INT_24_8;
                    break;
                case pc.PIXELFORMAT_111110F: // WebGL2 only
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = gl.R11F_G11F_B10F;
                    texture._glPixelType = gl.FLOAT;
                    break;
                case pc.PIXELFORMAT_SRGB: // WebGL2 only
                    texture._glFormat = gl.RGB;
                    texture._glInternalFormat = gl.SRGB8;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
                case pc.PIXELFORMAT_SRGBA: // WebGL2 only
                    texture._glFormat = gl.RGBA;
                    texture._glInternalFormat = gl.SRGB8_ALPHA8;
                    texture._glPixelType = gl.UNSIGNED_BYTE;
                    break;
            }

            // Track this texture now that it is a WebGL resource
            this.textures.push(texture);
        }
    });

    return {
        GraphicsDevice: GraphicsDevice
    };
}());
