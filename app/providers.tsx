'use client';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  colors: {
    azul: {
      50: "#38457a",
      100: "#38457a",
      200: "#38457a",
      300: "#38457a",
      400: "#38457a",
      500: "#38457a",
      600: "#38457a",
      700: "#38457a",
      800: "#38457a",
      900: "#38457a",
    },
    vermelho: {
      50: "#d84c4c",
      100: "#d84c4c",
      200: "#d84c4c",
      300: "#d84c4c",
      400: "#d84c4c",
      500: "#d84c4c",
      600: "#d84c4c",
      700: "#d84c4c",
      800: "#d84c4c",
      900: "#d84c4c",
    }
  },
})


export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>{children}</ChakraProvider>
  );
}