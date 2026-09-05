#!/bin/bash
# WireMock Setup — Script 01: Standalone JAR (no Docker needed, just Java 11+)
# What: Starts WireMock mock server via standalone JAR at http://localhost:8080
# Why: For SDETs without Docker — direct Java run, no container.
# Where: companion_files/wiremock-setup/ — run from this folder
# How: bash 01-standalone-jar.sh  (or chmod +x then ./01-standalone-jar.sh)
# Expected: "WireMock started on port 8080" + curl http://localhost:8080/__admin/mappings → {"mappings":[...]}
# What if: Java not found → install Temurin 17 from https://adoptium.net/temurin/releases/
#          Port 8080 in use → change --port 9999 and update {{baseUrl}} in Postman
#          JAR not found → download from https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/3.13.2/wiremock-standalone-3.13.2.jar

set -e

WIREMOCK_VERSION="3.13.2"
WIREMOCK_JAR="wiremock-standalone-${WIREMOCK_VERSION}.jar"
WIREMOCK_URL="https://repo1.maven.org/maven2/org/wiremock/wiremock-standalone/${WIREMOCK_VERSION}/${WIREMOCK_JAR}"
PORT="${PORT:-8080}"

echo "[WireMock] Standalone JAR setup — version ${WIREMOCK_VERSION}"

# Check Java
if ! command -v java &> /dev/null; then
  echo "[ERROR] Java not found. Install Eclipse Temurin 17:"
  echo "  Windows: winget install EclipseAdoptium.Temurin.17.JDK"
  echo "  Mac:     brew install --cask temurin@17"
  echo "  Linux:   sdk install java 17-tem  (or apt install openjdk-17-jdk)"
  echo "  Download: https://adoptium.net/temurin/releases/"
  echo "  Verify: java -version  (need 11+)"
  exit 1
fi
echo "[OK] Java: $(java -version 2>&1 | head -n1)"

# Download JAR if missing
if [ ! -f "${WIREMOCK_JAR}" ]; then
  echo "[INFO] Downloading ${WIREMOCK_JAR}..."
  if command -v curl &> /dev/null; then
    curl -L -o "${WIREMOCK_JAR}" "${WIREMOCK_URL}"
  elif command -v wget &> /dev/null; then
    wget -O "${WIREMOCK_JAR}" "${WIREMOCK_URL}"
  else
    echo "[ERROR] Need curl or wget to download JAR. Get it manually:"
    echo "  ${WIREMOCK_URL}"
    exit 1
  fi
  echo "[OK] Downloaded ${WIREMOCK_JAR}"
else
  echo "[OK] Found ${WIREMOCK_JAR}"
fi

# Ensure mappings folder exists
mkdir -p wiremock/mappings wiremock/__files
if [ ! -f "wiremock/mappings/get-user.json" ] && [ -d "03-mappings/mappings" ]; then
  echo "[INFO] Copying example mappings..."
  cp 03-mappings/mappings/*.json wiremock/mappings/ 2>/dev/null || true
  cp 03-mappings/__files/* wiremock/__files/ 2>/dev/null || true
fi

echo "[INFO] Starting WireMock on port ${PORT}..."
echo "  Flags: --global-response-templating (Handlebars) --enable-stub-cors (for UI) --verbose"
echo "  Root:  ./wiremock  (expects wiremock/mappings/*.json + wiremock/__files/*)"
echo "  Admin: http://localhost:${PORT}/__admin/mappings"
echo "  Stop:  Ctrl+C"
echo ""

java -jar "${WIREMOCK_JAR}" \
  --port "${PORT}" \
  --global-response-templating \
  --enable-stub-cors \
  --root-dir ./wiremock \
  --verbose
