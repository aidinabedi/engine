#ifdef MAPCOLOR
uniform vec3 material_sheen;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_sheenMap;
#endif

void getSheen() {
    sheenColor = vec3(1.0);

    #ifdef MAPCOLOR
        sheenColor *= material_sheen.rgb;
    #endif

    #ifdef MAPTEXTURE
        sheenColor *= texture2DSRGB(texture_sheenMap, $UV).$CH;
    #endif

    #ifdef MAPVERTEX
        sheenColor *= gammaCorrectInput(saturate(vVertexColor.$VC));
    #endif
}

