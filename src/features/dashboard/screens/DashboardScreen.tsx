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
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../../constants/theme';

export default function DashboardScreen() {
  const router = useRouter();

  const handleNavigateToGapDetection = () => {
    router.push('/gap-detection' as any);
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
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={() => router.push('/profile' as any)}
        >
          <Image
            source={require('../../../assets/images/farmer_avatar.png')}
            style={styles.avatarImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>Welcome back, Farmer Raju</Text>
          <Text style={styles.welcomeSubtitle}>
            Your precision agriculture suite is ready. Select a module to begin analysis.
          </Text>
        </View>

        {/* Modules List */}
        <View style={styles.modulesContainer}>
          
          {/* Gap Detection Card - Available */}
          <TouchableOpacity 
            style={styles.moduleCard} 
            activeOpacity={0.9}
            onPress={handleNavigateToGapDetection}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#D8F3DC' }]}>
                <Ionicons name="location" size={24} color="#1B5E20" />
              </View>
              <View style={styles.availableBadge}>
                <Text style={styles.availableBadgeText}>Available</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={styles.cardTitle}>Gap Detection</Text>
              <Text style={styles.cardDescription}>
                Identify missing plants in your field with high-resolution drone imagery.
              </Text>
            </View>

            <View style={styles.thumbnailContainer}>
              <Image
                source={require('../../../assets/images/gap_detection_thumbnail.png')}
                style={styles.thumbnailImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>

          {/* Weed Detection Card - Coming Soon */}
          <View style={[styles.moduleCard, styles.disabledCard]}>
            <View style={styles.cardHeader}>
              <View style={[styles.iconContainer, { backgroundColor: '#F1F5F9' }]}>
                <Ionicons name="rose" size={24} color="#94A3B8" />
              </View>
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonBadgeText}>Coming Soon</Text>
              </View>
            </View>

            <View style={styles.cardBody}>
              <Text style={[styles.cardTitle, styles.disabledText]}>Weed Detection</Text>
              <Text style={[styles.cardDescription, styles.disabledText]}>
                Automatic weed identification and mapping for targeted spraying.
              </Text>
            </View>

            <View style={[styles.thumbnailContainer, styles.disabledThumbnail]}>
              <Image
                source={require('../../../assets/images/weed_detection_thumbnail.png')}
                style={[styles.thumbnailImage, { opacity: 0.4 }]}
                resizeMode="cover"
              />
              <View style={styles.overlayLock}>
                <Ionicons name="lock-closed" size={24} color="#64748B" />
              </View>
            </View>
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
  profileButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: '#D8F3DC',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  welcomeContainer: {
    marginTop: 20,
    marginBottom: 25,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: Colors.light.text,
    lineHeight: 32,
  },
  welcomeSubtitle: {
    fontSize: 15,
    color: Colors.light.textSecondary,
    marginTop: 8,
    lineHeight: 22,
  },
  modulesContainer: {
    gap: 20,
  },
  moduleCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(17, 56, 43, 0.05)',
    ...Platform.select({
      ios: {
        shadowColor: '#11382B',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.06,
        shadowRadius: 10,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  disabledCard: {
    opacity: 0.8,
    borderColor: Colors.light.border,
    elevation: 1,
    shadowOpacity: 0.02,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  availableBadge: {
    backgroundColor: '#1E3E2F',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
  },
  availableBadgeText: {
    color: Colors.light.white,
    fontSize: 12,
    fontWeight: '700',
  },
  comingSoonBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  comingSoonBadgeText: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 19,
    fontWeight: '700',
    color: Colors.light.text,
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: Colors.light.textSecondary,
    lineHeight: 20,
  },
  disabledText: {
    color: '#94A3B8',
  },
  thumbnailContainer: {
    height: 150,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
    position: 'relative',
  },
  disabledThumbnail: {
    backgroundColor: '#F8FAFC',
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  overlayLock: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(241, 245, 249, 0.4)',
  },
});
