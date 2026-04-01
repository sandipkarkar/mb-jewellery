import { useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Heart, LogOut, MessageCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { whatsappUrl } from '../../utils/whatsapp';
import { SITE_NAME } from '../../config/site';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
  });

  const handleSave = () => {
    // Save profile data
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen py-8 sm:py-12 px-3 sm:px-4 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">My Account</h1>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 lg:w-auto">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">WhatsApp</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-bold">Personal Information</h2>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>

              {isEditing ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({ ...formData, firstName: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">
                        {formData.firstName} {formData.lastName}
                      </h3>
                      <p className="text-muted-foreground">Customer since March 2026</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Phone</p>
                        <p className="font-medium">{formData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Orders / WhatsApp */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-6 text-center"
            >
              <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Place or track via WhatsApp</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We take orders directly on WhatsApp. Message us to purchase, ask questions, or follow up on delivery.
              </p>
              <Button className="bg-[#25D366] text-white hover:bg-[#20BD5A]" asChild>
                <a href={whatsappUrl(`Hi ${SITE_NAME}, I have a question about my order.`)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Open WhatsApp
                </a>
              </Button>
            </motion.div>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-6 text-center"
            >
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Saved Addresses</h3>
              <p className="text-muted-foreground mb-6">
                Manage your delivery addresses
              </p>
              <Link to="/addresses">
                <Button>Manage Addresses</Button>
              </Link>
            </motion.div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-6 text-center"
            >
              <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Your Wishlist</h3>
              <p className="text-muted-foreground mb-6">
                View your saved favorite items
              </p>
              <Link to="/wishlist">
                <Button>View Wishlist</Button>
              </Link>
            </motion.div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-lg border p-6"
            >
              <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Account Settings</h2>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-2">Change Password</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Update your password to keep your account secure
                  </p>
                  <Button variant="outline">Change Password</Button>
                </div>

                {/* Email Preferences */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-2">Email Preferences</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage your email notification settings
                  </p>
                  <Button variant="outline">Manage Preferences</Button>
                </div>

                {/* Delete Account */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-2">Delete Account</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Permanently delete your account and all associated data
                  </p>
                  <Button variant="destructive">Delete Account</Button>
                </div>

                {/* Logout */}
                <div>
                  <h3 className="font-semibold mb-2">Sign Out</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Sign out of your account on this device
                  </p>
                  <Button variant="outline" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
