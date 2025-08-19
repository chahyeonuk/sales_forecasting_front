import { useState, useEffect } from "react"
import { Star, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import { Checkbox } from "../components/ui/checkbox"

export function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.")
      setIsLoading(false)
      return
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError("올바른 이메일 형식을 입력해주세요.")
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock authentication - accept any valid email/password combination
      if (formData.password.length >= 6) {
        // Store login info if remember me is checked
        if (formData.rememberMe) {
          localStorage.setItem("rememberLogin", "true")
          localStorage.setItem("userEmail", formData.email)
        }
        
        // Call the onLogin callback
        onLogin({
          email: formData.email,
          rememberMe: formData.rememberMe
        })
      } else {
        setError("비밀번호는 최소 6자 이상이어야 합니다.")
      }
    } catch (err) {
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
    } finally {
      setIsLoading(false)
    }
  }

  // Check for remembered login on component mount
  useEffect(() => {
    const rememberLogin = localStorage.getItem("rememberLogin")
    const userEmail = localStorage.getItem("userEmail")
    
    if (rememberLogin && userEmail) {
      setFormData(prev => ({
        ...prev,
        email: userEmail,
        rememberMe: true
      }))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-0">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-primary" />
              <CardTitle className="text-2xl">Sales Forecasting</CardTitle>
            </div>
            <div className="w-24 h-px bg-border mx-auto"></div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <span className="text-primary">▸</span>
                  이메일(ID)
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@company.com"
                  className="h-11"
                  disabled={isLoading}
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2">
                  <span className="text-primary">▸</span>
                  비밀번호
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    placeholder="••••••••"
                    className="h-11 pr-10"
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) => handleInputChange("rememberMe", checked)}
                  disabled={isLoading}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm cursor-pointer select-none"
                >
                  로그인 상태 유지
                </Label>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}

              {/* Login Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? "로그인 중..." : "로 그 인"}
              </Button>
            </form>

            {/* Divider */}
            <div className="border-t border-border pt-4"></div>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>ⓒ 2025 Forecast Inc.</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>LOGO</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo Credentials Info */}
        <Card className="mt-4 border-dashed">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-2">데모 계정 정보:</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• 이메일: 유효한 이메일 형식 (예: demo@company.com)</p>
              <p>• 비밀번호: 6자 이상 (예: demo123)</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}