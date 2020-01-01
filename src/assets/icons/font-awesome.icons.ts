import {
  faBroom,
  faBrush,
  faChessBoard,
  faPaintRoller,
  faTree
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook
} from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export class FaIconsComponent {
  constructor() { }
  public static init() {
    library.add(faBroom, faFacebook, faBrush, faChessBoard, faPaintRoller, faTree);
  }
}
