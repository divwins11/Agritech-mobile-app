import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';

export default function ProfileScreen() {
  const handleEditProfile = () => {
    // Action mock
    console.log('Edit Profile Pressed');
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
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="settings-outline" size={22} color={Colors.light.text} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarBorder}>
              <Image
                source={require('../../../assets/images/farmer_avatar.png')}
                style={styles.avatarImage}
              />
            </View>
          </View>

          <Text style={styles.userName}>Raju M.</Text>
          
          <View style={styles.siteContainer}>
            <Ionicons name="business-outline" size={16} color={Colors.light.textSecondary} />
            <Text style={styles.siteText}>VSI</Text>
          </View>

          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={handleEditProfile}
            activeOpacity={0.8}
          >
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Farm Details Card */}
        <View style={styles.farmDetailsCard}>
          <View style={styles.farmDetailsHeader}>
            <Ionicons name="analytics-outline" size={20} color={Colors.light.primary} />
            <Text style={styles.farmDetailsTitle}>Farm Details</Text>
          </View>

          <View style={styles.detailsGrid}>
            <View style={styles.gridRow}>
              <View style={styles.gridColumn}>
                <Text style={styles.gridLabel}>LOCATION</Text>
                <Text style={styles.gridValue}>Pune</Text>
              </View>
              <View style={styles.gridColumn}>
                <Text style={styles.gridLabel}>TOTAL SIZE</Text>
                <Text style={styles.gridValue}>500 acres</Text>
              </View>
            </View>

            <View style={[styles.gridRow, { marginTop: 16 }]}>
              <View style={styles.gridColumn}>
                <Text style={styles.gridLabel}>MAIN CROPS</Text>
                <View style={styles.cropBadge}>
                  <Text style={styles.cropBadgeText}>Sugarcane</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Saved Analyses Section */}
        <View style={styles.savedAnalysesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Saved Analyses</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllLink}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.analysesList}>
            {/* Analysis Item 1 */}
            <TouchableOpacity style={styles.analysisItem} activeOpacity={0.7}>
              <View style={styles.analysisItemLeft}>
                <View style={styles.analysisIconBg}>
                  <Ionicons name="bar-chart" size={18} color="#2E7D32" />
                </View>
                <View style={styles.analysisInfo}>
                  <Text style={styles.analysisTitle}>West Quad Gap Detection</Text>
                  <Text style={styles.analysisMeta}>Oct 12, 2023 • 2.4% Margin Gap</Text>
                </View>
              </View>
              <View style={styles.analysisItemRight}>
                <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
                  <Text style={[styles.statusBadgeText, { color: '#2E7D32' }]}>Optimal</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Analysis Item 2 */}
            <TouchableOpacity style={styles.analysisItem} activeOpacity={0.7}>
              <View style={styles.analysisItemLeft}>
                <View style={[styles.analysisIconBg, { backgroundColor: '#FFF3E0' }]}>
                  <Ionicons name="bar-chart" size={18} color="#EF6C00" />
                </View>
                <View style={styles.analysisInfo}>
                  <Text style={styles.analysisTitle}>East Block Gap Detection</Text>
                  <Text style={styles.analysisMeta}>Oct 01, 2023 • 5.1% Margin Gap</Text>
                </View>
              </View>
              <View style={styles.analysisItemRight}>
                <View style={[styles.statusBadge, { backgroundColor: '#FFEBEE' }]}>
                  <Text style={[styles.statusBadgeText, { color: '#B71C1C' }]}>Action Needed</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>

            {/* Analysis Item 3 */}
            <TouchableOpacity style={styles.analysisItem} activeOpacity={0.7}>
              <View style={styles.analysisItemLeft}>
                <View style={styles.analysisIconBg}>
                  <Ionicons name="map-outline" size={18} color="#2E7D32" />
                </View>
                <View style={styles.analysisInfo}>
                  <Text style={styles.analysisTitle}>North Boundary Survey</Text>
                  <Text style={styles.analysisMeta}>Sep 18, 2023 • Completed</Text>
                </View>
              </View>
              <View style={styles.analysisItemRight}>
                <View style={[styles.statusBadge, { backgroundColor: '#E8F5E9' }]}>
                  <Text style={[styles.statusBadgeText, { color: '#2E7D32' }]}>Optimal</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#94A3B8" />
              </View>
            </TouchableOpacity>
          </View>
        </View>

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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.04,
        shadowRadius: 10,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarBorder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#D8F3DC',
    padding: 2,
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  userName: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.light.text,
    marginBottom: 6,
  },
  siteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 18,
  },
  siteText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.textSecondary,
  },
  editProfileButton: {
    backgroundColor: '#11382B',
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 100,
  },
  editProfileButtonText: {
    color: Colors.light.white,
    fontSize: 14,
    fontWeight: '700',
  },
  farmDetailsCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderLeftWidth: 5,
    borderLeftColor: '#11382B',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.03,
        shadowRadius: 6,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  farmDetailsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  farmDetailsTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.light.text,
  },
  detailsGrid: {
    width: '100%',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridColumn: {
    flex: 1,
  },
  gridLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.light.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  gridValue: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.light.text,
  },
  cropBadge: {
    backgroundColor: '#D8F3DC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  cropBadgeText: {
    color: '#1B5E20',
    fontWeight: '700',
    fontSize: 13,
  },
  savedAnalysesSection: {
    marginTop: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.light.text,
  },
  viewAllLink: {
    color: '#8D6E63',
    fontWeight: '700',
    fontSize: 14,
  },
  analysesList: {
    gap: 12,
  },
  analysisItem: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  analysisItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  analysisIconBg: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysisInfo: {
    flex: 1,
  },
  analysisTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 2,
  },
  analysisMeta: {
    fontSize: 12,
    color: Colors.light.textSecondary,
  },
  analysisItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
