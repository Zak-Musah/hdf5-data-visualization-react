import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

window.URL.createObjectURL = function () {};
window.HTMLCanvasElement.prototype.getContext = () => {};
configure({ adapter: new Adapter() });
