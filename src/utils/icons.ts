import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faUser,
  faFingerprint,
} from "@fortawesome/free-solid-svg-icons";

export function loadIcons(): void {
  library.add(faCircleNotch);
  library.add(faUser);
  library.add(faFingerprint);
}
