
   gl_FragColor.rgb = combineColor();
  #ifdef SHEEN
   gl_FragColor.rgb += combineSheen();
  #endif
  #ifdef CLEARCOAT
   gl_FragColor.rgb += combineClearCoat();
  #endif
   gl_FragColor.rgb += getEmission();
   gl_FragColor.rgb = addFog(gl_FragColor.rgb);
   //gl_FragColor.rgb = sheenIndirectLight * sheenReflection.rgb * sheenReflection.a;
   #ifndef HDR
    gl_FragColor.rgb = toneMap(gl_FragColor.rgb);
    gl_FragColor.rgb = gammaCorrectOutput(gl_FragColor.rgb);
   #endif
