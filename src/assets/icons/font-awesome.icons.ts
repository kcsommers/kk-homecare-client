import {
  faBroom,
  faBrush,
  faChessBoard,
  faPaintRoller,
  faTree,
  faBirthdayCake
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import {
  faCopyright
} from '@fortawesome/free-regular-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export class FaIconsComponent {
  constructor() { }
  public static init() {
    library.add(faBroom, faFacebook, faBrush, faChessBoard, faPaintRoller, faTree, faCopyright, faBirthdayCake);
  }
}
