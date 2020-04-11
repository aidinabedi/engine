#ifdef MAPCOLOR
uniform vec3 material_sheen;
#endif

#ifdef MAPTEXTURE
uniform sampler2D texture_sheenMap;
#endif

void getSheen() {
    dSheenColor = vec3(1.0);

    #ifdef MAPCOLOR
        dSheenColor *= material_sheen.rgb;
    #endif

    #ifdef MAPTEXTURE
        dSheenColor *= texture2DSRGB(texture_sheenMap, $UV).$CH;
    #endif

    #ifdef MAPVERTEX
        dSheenColor *= gammaCorrectInput(saturate(vVertexColor.$VC));
    #endif
}

