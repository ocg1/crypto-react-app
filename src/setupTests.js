import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, render, mount } from "enzyme";
import faker from 'faker'

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow
global.render = render
global.mount = mount
global.faker = faker
