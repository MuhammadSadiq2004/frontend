// AuthLayout.js
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { UserProvider } from "../../context/Usercontext";
import { Loader }  from "../../components";

const AuthLayout = () => {
  const loading = false; // Replace with actual loading state if needed
  const isLogged = false; // Replace with actual login state if needed

  if (!loading && isLogged) return <Redirect href="/otp" />;

  return (
    <UserProvider>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="sign-up"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="otp"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <Loader isLoading={loading} />
      <StatusBar backgroundColor="#161622" style="light" />
    </UserProvider>
  );
};

export default AuthLayout;
