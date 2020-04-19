#define EPSILON 0.0000001
#define PI 3.14159

#define absEps(x)           abs(x) + EPSILON
#define maxEps(x)           max(x, EPSILON)
#define clampEps(x)         clamp(x, EPSILON, 1.0)

float calcDistributionSheen(float NdotH, float roughness) {
    float invR = 1.0 / roughness;
    float cos2h = NdotH * NdotH;
    float sin2h = 1.0 - cos2h;
    return (2.0 + invR) * pow(sin2h, invR * 0.5) / (2.0 * PI);
}

float calcVisibilitySheen(float NdotL, float NdotV) {
    return 1.0 / (4.0 * (NdotL + NdotV - NdotL * NdotV));
}

float calcMaxAmbientSheen(float NdotV, float roughness) {
    float c = 1.0 - NdotV;
    float c3 = c*c*c;
    return 0.65584461 * c3 + 1.0 / (4.16526551 + exp(-7.97291361*roughness+6.33516894));
}

float getMaxAmbientSheen() {
    float NdotV = clampEps(dot(dNormalW, dViewDirW));
    float roughness = clampEps(1.0 - sheenGlossiness);
    return calcMaxAmbientSheen(NdotV, roughness);
}

float getLightSheen() {
    vec3 N = dNormalW;
    vec3 L = dLightDirNormW;
    vec3 V = dViewDirW;
    vec3 H = normalize(V + L);

    float NdotH = clampEps(dot(N, H));
    float NdotL = clampEps(dot(N, L));
    float NdotV = clampEps(dot(N, V));

    float roughness = clampEps(1.0 - sheenGlossiness);
    float distribution = calcDistributionSheen(NdotH, roughness);
    float visibility = calcVisibilitySheen(NdotL, NdotV);
    return distribution * visibility * NdotL;
}

vec3 combineSheen() {
    return (sheenIndirectLight + sheenDirectLight) * sheenColor;
}

