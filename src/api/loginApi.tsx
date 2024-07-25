export const login = async (email: string, password: string) => {
    try {
      const response = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
      console.log(response, "in api")
      console.log(result, "in api")
  
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
  
      return result;
    } catch (error) {
      throw error;
    }
  };
  