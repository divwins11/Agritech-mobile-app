import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';

export default function GapDetectionScreen() {
  const [kmlFile, setKmlFile] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleUploadKml = () => {
    // Mock upload
    setKmlFile('farm_boundary_pune_v2.kml');
  };

  const handleUploadImage = () => {
    // Mock upload
    setImageFile('drone_orthomosaic_crop_june.png');
  };

  const handleFindGaps = () => {
    if (!kmlFile || !imageFile) {
      // For demo, auto-fill if not uploaded
      setKmlFile('farm_boundary_pune_v2.kml');
      setImageFile('drone_orthomosaic_crop_june.png');
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleReset = () => {
    setKmlFile(null);
    setImageFile(null);
    setShowResults(false);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.light.background} />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <View style={styles.logoIcon}>
            <Ionicons name="leaf" size={20} color={Colors.light.white} />
          </View>
          <Text style={styles.logoText}>AgriTech</Text>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={Colors.light.text} />
          </TouchableOpacity>
          <View style={styles.initialsBadge}>
            <Text style={styles.initialsText}>RM</Text>
          </View>
        </View>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Description */}
        <View style={styles.titleSection}>
          <Text style={styles.pageTitle}>Gap Detection Analysis</Text>
          <Text style={styles.pageSubtitle}>
            Identify plantation inefficiencies with high-precision AI computer vision.
          </Text>
        </View>

        {/* Input Cards Container */}
        <View style={styles.cardsContainer}>
          
          {/* Upload KML Card */}
          <View style={styles.uploadCard}>
            <View style={styles.uploadCardHeader}>
              <View style={styles.iconLabelRow}>
                <Ionicons name="map" size={20} color="#8D6E63" />
                <Text style={styles.uploadCardTitle}>Upload KML File</Text>
              </View>
              {kmlFile && (
                <TouchableOpacity onPress={() => setKmlFile(null)}>
                  <Ionicons name="close-circle" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity 
              style={[styles.uploadBox, kmlFile ? styles.uploadBoxActive : null]}
              onPress={handleUploadKml}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={kmlFile ? "document-text" : "cloud-upload-outline"} 
                size={32} 
                color={kmlFile ? "#2E7D32" : "#94A3B8"} 
              />
              <Text style={styles.uploadBoxText}>
                {kmlFile ? (
                  <Text style={styles.fileName}>{kmlFile}</Text>
                ) : (
                  <>Drag and drop your boundary file or <Text style={styles.browseLink}>browse</Text></>
                )}
              </Text>
              <View style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>.kml format only</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Upload Image Card */}
          <View style={styles.uploadCard}>
            <View style={styles.uploadCardHeader}>
              <View style={styles.iconLabelRow}>
                <Ionicons name="image" size={20} color="#EF6C00" />
                <Text style={styles.uploadCardTitle}>Upload Plantation Image</Text>
              </View>
              {imageFile && (
                <TouchableOpacity onPress={() => setImageFile(null)}>
                  <Ionicons name="close-circle" size={20} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity 
              style={[styles.uploadBox, imageFile ? styles.uploadBoxActive : null]}
              onPress={handleUploadImage}
              activeOpacity={0.8}
            >
              <Ionicons 
                name={imageFile ? "image-sharp" : "images-outline"} 
                size={32} 
                color={imageFile ? "#2E7D32" : "#94A3B8"} 
              />
              <Text style={styles.uploadBoxText}>
                {imageFile ? (
                  <Text style={styles.fileName}>{imageFile}</Text>
                ) : (
                  <>Drag and drop high-res drone imagery or <Text style={styles.browseLink}>browse</Text></>
                )}
              </Text>
              <View style={styles.formatBadge}>
                <Text style={styles.formatBadgeText}>JPG, PNG format</Text>
              </View>
            </TouchableOpacity>
          </View>

        </View>

        {/* Find Gaps Action Button */}
        <View style={styles.actionButtonContainer}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={Colors.light.primary} />
              <Text style={styles.loadingText}>Analyzing Orthomosaic Imagery...</Text>
            </View>
          ) : (
            <TouchableOpacity 
              style={styles.findGapsButton}
              onPress={handleFindGaps}
              activeOpacity={0.8}
            >
              <Ionicons name="search" size={20} color={Colors.light.white} style={styles.buttonIcon} />
              <Text style={styles.findGapsButtonText}>Find Gaps</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Analysis Results (Displayed when showResults is true) */}
        {showResults && (
          <View style={styles.resultsContainer}>
            
            {/* Results Header */}
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Analysis Results</Text>
              <View style={styles.downloadButtonsRow}>
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="document-text-outline" size={16} color={Colors.light.text} />
                  <Text style={styles.downloadButtonText}>Download PDF</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.downloadButton}>
                  <Ionicons name="grid-outline" size={16} color={Colors.light.text} />
                  <Text style={styles.downloadButtonText}>Download CSV</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Metrics Grid */}
            <View style={styles.metricsGrid}>
              
              {/* Stat 1 */}
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>TOTAL EXPECTED</Text>
                <Text style={[styles.statValue, { color: '#1B5E20' }]}>1200</Text>
                <Text style={styles.statSubtitle}>Projected Count</Text>
              </View>

              {/* Stat 2 */}
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>DETECTED</Text>
                <Text style={[styles.statValue, { color: '#1B5E20' }]}>1050</Text>
                <View style={styles.subtextWithIcon}>
                  <Ionicons name="checkmark-circle" size={14} color="#1B5E20" />
                  <Text style={styles.statSubtitleWithIcon}>Validated</Text>
                </View>
              </View>

              {/* Stat 3 */}
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>GAPS FOUND</Text>
                <Text style={[styles.statValue, { color: '#B71C1C' }]}>150</Text>
                <View style={styles.subtextWithIcon}>
                  <Ionicons name="warning" size={14} color="#B71C1C" />
                  <Text style={[styles.statSubtitleWithIcon, { color: '#B71C1C' }]}>Action Needed</Text>
                </View>
              </View>

              {/* Stat 4 */}
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>COVERAGE</Text>
                <Text style={[styles.statValue, { color: '#8D6E63' }]}>87.5%</Text>
                <View style={styles.progressTrack}>
                  <View style={[styles.progressBar, { width: '87.5%' }]} />
                </View>
              </View>

            </View>

            {/* Plantation Analysis Map Card */}
            <View style={styles.mapCard}>
              <Text style={styles.mapCardTitle}>Plantation Analysis Map</Text>
              
              <View style={styles.mapContainer}>
                {/* Generated overlay map image */}
                <Image 
                  source={require('../../../assets/images/plantation_map.png')} 
                  style={styles.mapImage}
                  resizeMode="cover"
                />

                {/* Map Pins overlay mock */}
                <View style={[styles.mapPin, { top: '35%', left: '35%', backgroundColor: '#C62828' }]} />
                <View style={[styles.mapPin, { top: '65%', left: '50%', backgroundColor: '#2E7D32' }]} />
                <View style={[styles.mapPin, { top: '55%', left: '65%', backgroundColor: '#C62828' }]} />
                <View style={[styles.mapPin, { top: '70%', left: '30%', backgroundColor: '#2E7D32' }]} />

                {/* Zoom / Layer Floating Controls */}
                <View style={styles.mapControls}>
                  <TouchableOpacity style={styles.mapControlBtn}>
                    <Ionicons name="add" size={20} color="#1E293B" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.mapControlBtn}>
                    <Ionicons name="remove" size={20} color="#1E293B" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.mapControlBtn}>
                    <Ionicons name="layers" size={18} color="#1E293B" />
                  </TouchableOpacity>
                </View>

                {/* Map Legend Overlay */}
                <View style={styles.mapLegend}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#1B5E20' }]} />
                    <Text style={styles.legendText}>Detected Crop</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: '#B71C1C' }]} />
                    <Text style={styles.legendText}>Gap Detected</Text>
                  </View>
                </View>

              </View>
            </View>

            {/* Reset Button for Demo */}
            <TouchableOpacity 
              style={styles.resetButton}
              onPress={handleReset}
            >
              <Text style={styles.resetButtonText}>Clear Current Analysis</Text>
            </TouchableOpacity>

          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 15 : 10,
    paddingBottom: 10,
    backgroundColor: Colors.light.background,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.light.primary,
    letterSpacing: -0.5,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  initialsBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#D8F3DC',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#C7EBCB',
  },
  initialsText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  titleSection: {
    marginTop: 20,
    marginBottom: 25,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.light.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    marginTop: 6,
    lineHeight: 20,
  },
  cardsContainer: {
    gap: 20,
  },
  uploadCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  uploadCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  uploadCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  uploadBox: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  uploadBoxActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
    borderStyle: 'solid',
  },
  uploadBoxText: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
  },
  fileName: {
    fontWeight: '700',
    color: '#1B5E20',
  },
  browseLink: {
    color: '#2563EB',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  formatBadge: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  formatBadgeText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
  },
  actionButtonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  findGapsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#11382B',
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 100,
    minWidth: 200,
    ...Platform.select({
      ios: {
        shadowColor: '#11382B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  buttonIcon: {
    marginRight: 8,
  },
  findGapsButtonText: {
    color: Colors.light.white,
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    fontSize: 14,
    color: Colors.light.text,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 30,
    gap: 20,
  },
  resultsHeader: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 8,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.light.primary,
  },
  downloadButtonsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  downloadButtonText: {
    fontSize: 12,
    color: Colors.light.text,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 14,
    width: '48%',
    borderLeftWidth: 4,
    borderLeftColor: '#11382B',
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.light.textSecondary,
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    marginVertical: 4,
  },
  statSubtitle: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  subtextWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statSubtitleWithIcon: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5E20',
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#EFEBE9',
    borderRadius: 3,
    marginTop: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8D6E63',
    borderRadius: 3,
  },
  mapCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  mapCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.textSecondary,
    marginBottom: 12,
  },
  mapContainer: {
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#E2E8F0',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  mapPin: {
    position: 'absolute',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 1.5,
    elevation: 2,
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    top: 12,
    gap: 8,
  },
  mapControlBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CBD5E1',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  mapLegend: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  resetButton: {
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#EF6C00',
    fontSize: 13,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
