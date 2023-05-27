import "@/styles/globals.css";
import "simplebar-react/dist/simplebar.min.css";

import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </LocalizationProvider>
  );
}
