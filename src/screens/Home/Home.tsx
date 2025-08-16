"use client"

import React from "react"
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAuth } from "@/contexts/AuthContext"
import { StorageService } from "@/hooks/storage"
import { useTheme } from "@/contexts/ThemeContext"

export default function RoomHome() {
  const insets = useSafeAreaInsets()
  const { logout } = useAuth()
  const { isDark } = useTheme()

  const handleLogout = async () => {
    Alert.alert(
      "Çıkış Yap",
      "Tüm kullanıcı verileriniz silinecek. Çıkış yapmak istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel",
        },
        {
          text: "Çıkış Yap",
          style: "destructive",
          onPress: async () => {
            try {
              // Clear all user-related data
              await StorageService.clear()
              
              // Logout from auth context
              await logout()
              
              // You can add navigation to login screen here if needed
              // navigation.navigate('Login')
            } catch (error) {
              console.error('Logout error:', error)
              Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.")
            }
          },
        },
      ]
    )
  }

  const stats = [
    { title: "Total Users", value: "1,234", icon: "people", color: "#000000" },
    { title: "Active Sessions", value: "567", icon: "wifi", color: "#000000" },
    { title: "Revenue", value: "$12,345", icon: "trending-up", color: "#000000" },
  ]

  const quickActions = [
    { title: "Add New User", icon: "person-add", color: "#000000" },
    { title: "View Analytics", icon: "analytics", color: "#000000" },
    { title: "Settings", icon: "settings", color: "#000000" },
    { title: "Help & Support", icon: "help-circle", color: "#000000" },
  ]

  const recentActivities = [
    { title: "New user registered", time: "2 minutes ago", icon: "person-add" },
    { title: "Payment received", time: "5 minutes ago", icon: "card" },
    { title: "System update", time: "10 minutes ago", icon: "refresh" },
    { title: "Support ticket", time: "15 minutes ago", icon: "chatbubble" },
  ]

  return (
    <View className="flex-1 bg-white dark:bg-neutral-900">
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} backgroundColor={isDark ? "#171717" : "#FFFFFF"} />

      {/* Header */}
      <View 
        className="px-4 pb-4 bg-white dark:bg-neutral-900 border-b border-gray-100 dark:border-gray-800"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1 mr-4">
            <Text className="text-2xl font-extrabold text-gray-900 dark:text-white">
              Dashboard
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Welcome back! Here&apos;s what&apos;s happening.
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="w-10 h-10 rounded-full bg-black justify-center items-center">
              <Ionicons name="notifications" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity className="w-10 h-10 rounded-full bg-red-500 justify-center items-center" onPress={handleLogout}>
              <Ionicons name="exit" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        className="flex-1"
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Cards */}
        <View className="mt-4">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Overview
          </Text>
          <View className="flex-row justify-between">
            {stats.map((stat, index) => (
              <View
                key={index}
                className={`flex-1 bg-gray-50 dark:bg-neutral-800 rounded-xl p-3 border border-gray-200 dark:border-gray-800 ${
                  index === 1 ? 'mx-1' : ''
                }`}
              >
                <View className="flex-row items-center mb-1">
                  <View
                    className="w-6 h-6 rounded-full justify-center items-center mr-1"
                    style={{ backgroundColor: stat.color }}
                  >
                    <Ionicons name={stat.icon as any} size={12} color="white" />
                  </View>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 font-medium flex-1">
                    {stat.title}
                  </Text>
                </View>
                <Text className="text-lg font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                className="w-[48%] bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 mb-3 border border-gray-200 dark:border-gray-800 items-center"
              >
                <View
                  className="w-10 h-10 rounded-full justify-center items-center mb-2"
                  style={{ backgroundColor: action.color }}
                >
                  <Ionicons name={action.icon as any} size={20} color="white" />
                </View>
                <Text className="text-xs font-semibold text-gray-900 dark:text-white text-center">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activities */}
        <View className="mt-6">
          <Text className="text-lg font-bold text-gray-900 dark:text-white mb-3">
            Recent Activities
          </Text>
          <View className="bg-gray-50 dark:bg-neutral-800 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
            {recentActivities.map((activity, index) => (
              <View
                key={index}
                className={`flex-row items-center py-2 ${
                  index === recentActivities.length - 1 ? '' : 'border-b border-gray-200 dark:border-gray-800'
                }`}
              >
                <View className="w-6 h-6 rounded-full bg-black justify-center items-center mr-3">
                  <Ionicons name={activity.icon as any} size={12} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-semibold text-gray-900 dark:text-white">
                    {activity.title}
                  </Text>
                  <Text className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {activity.time}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Welcome Card */}
        <View className="mt-6">
          <View className="bg-black rounded-xl p-5 items-center">
            <Ionicons name="star" size={24} color="white" className="mb-2" />
            <Text className="text-base font-bold text-white text-center mb-1">
              Welcome to Your App!
            </Text>
            <Text className="text-xs text-gray-300 text-center leading-4">
              This is a beautiful starter template. Customize it to match your brand and requirements.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View className="mt-8 items-center">
          <Text className="text-xs text-gray-400 dark:text-gray-500 text-center leading-4">
            Made with ❤️ by Bircan Sezgin
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}
