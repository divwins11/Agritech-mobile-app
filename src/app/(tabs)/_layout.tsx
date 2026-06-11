import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../constants/theme';

function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.tabBarContainer,
      { paddingBottom: Math.max(insets.bottom, 10) }
    ]}>
      <View style={styles.tabBarInner}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Map icons based on route name
          let iconName: keyof typeof Ionicons.glyphMap = 'grid-outline';
          let activeIconName: keyof typeof Ionicons.glyphMap = 'grid';
          let displayName = '';

          if (route.name === 'index') {
            iconName = 'grid-outline';
            activeIconName = 'grid';
            displayName = 'Dashboard';
          } else if (route.name === 'gap-detection') {
            iconName = 'stats-chart-outline';
            activeIconName = 'stats-chart';
            displayName = 'Gap Detection';
          } else if (route.name === 'profile') {
            iconName = 'person-outline';
            activeIconName = 'person';
            displayName = 'Profile';
          }

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabItem}
              activeOpacity={0.8}
            >
              <View style={[
                styles.pillContainer, 
                isFocused ? styles.activePill : null
              ]}>
                <Ionicons 
                  name={isFocused ? activeIconName : iconName} 
                  size={22} 
                  color={isFocused ? Colors.light.white : Colors.light.textSecondary} 
                />
                <Text style={[
                  styles.tabLabel, 
                  { color: isFocused ? Colors.light.white : Colors.light.textSecondary }
                ]}>
                  {displayName}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
        }}
      />
      <Tabs.Screen
        name="gap-detection"
        options={{
          title: 'Gap Detection',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingTop: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.04,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  tabBarInner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    minWidth: 96,
    height: 60,
    gap: 4,
  },
  activePill: {
    backgroundColor: '#11382B', // Dark green active background
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});
