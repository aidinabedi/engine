#define EPSILON 0.0000001
#define PI 3.14159

#define absEps(x)           abs(x) + EPSILON
#define maxEps(x)           max(x, EPSILON)
#define clampEps(x)         clamp(x, EPSILON, 1.0)

float sheenDistribution_CharlieSheen(float NdotH, float roughness) {
    float invR = 1. / roughness;
    float cos2h = NdotH * NdotH;
    float sin2h = 1. - cos2h;
    return (2. + invR) * pow(sin2h, invR * .5) / (2. * PI);
}

float sheenVisibility_Ashikhmin(float NdotL, float NdotV) {
    return 1. / (4. * (NdotL + NdotV - NdotL * NdotV));
}

vec3 combineSheen() {

    vec3 N = dNormalW;
    vec3 L = dLightDirW;
    vec3 V = dViewDirW;
    vec3 H = normalize(V + L);

    float NdotH = clampEps(dot(N, H));
    float NdotL = clampEps(dot(N, L));
    float NdotV = clampEps(dot(N, V));
    float roughness = clampEps(1.0 - dSheenGloss);
    //float alphaG = convertRoughnessToAverageSlope(roughness);

    vec3 sheenColor = dSheenColor;
    float sheenIntensity = 1.0;
    float sheenDistribution = sheenDistribution_CharlieSheen(NdotH, roughness);
    float sheenVisibility = sheenVisibility_Ashikhmin(NdotL, NdotV);

    vec3 sheenTerm = sheenColor * sheenIntensity * sheenDistribution * sheenVisibility;
    //return sheenTerm * info.attenuation * NdotL * lightColor;
    return sheenTerm;
}
