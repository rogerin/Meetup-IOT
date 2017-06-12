#include <Arduino.h>

#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#define FIREBASE_HOST "--"
#define FIREBASE_AUTH "--"
#define WIFI_SSID "--"
#define WIFI_PASSWORD "--"
const int lampadaPin = 13;
void setup() {
  Serial.begin(9600);
  pinMode(lampadaPin, OUTPUT);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.print("conectando");

  while (WiFi.status() != WL_CONNECTED) { Serial.print(".");  delay(500); }

  Serial.println();
  Serial.print("conectado: ");
  Serial.println(WiFi.localIP());
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.setInt("lampada", 0);
}
void loop() {
  digitalWrite(lampadaPin, !Firebase.getInt("lampada"));
  delay(200);
}
