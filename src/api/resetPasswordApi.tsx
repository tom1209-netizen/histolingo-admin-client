// src/api/auth.ts

export const resetPassword = async (password: string, confirmPassword: string): Promise<any> => {
    try {
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }
  
      const response = await fetch("http://localhost:8000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }), 
      });
  
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Reset password failed");
      }
  
      const result = await response.json();
      return result;
  
    } catch (error) {
      throw error;
    }
  };
  