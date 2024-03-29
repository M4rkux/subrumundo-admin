import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCircleNotch,
  faUser,
  faFingerprint,
  faUsers,
  faSignOutAlt,
  faMicrophoneAlt,
  faRss,
  faChartBar,
  faHandHoldingUsd,
  faTrash,
  faAt,
  faSortUp,
  faSortDown,
  faPlus,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

export function loadIcons(): void {
  library.add(faCircleNotch);
  library.add(faUser);
  library.add(faFingerprint);
  library.add(faUsers);
  library.add(faSignOutAlt);
  library.add(faMicrophoneAlt);
  library.add(faRss);
  library.add(faChartBar);
  library.add(faHandHoldingUsd);
  library.add(faTrash);
  library.add(faAt);
  library.add(faSortUp);
  library.add(faSortDown);
  library.add(faPlus);
  library.add(faSearch);
}
