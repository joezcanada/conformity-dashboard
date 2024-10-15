import '@testing-library/jest-dom';


// global.matchMedia = global.matchMedia || function () {
//     return {
//         matches: false,
//         addListener: () => { },
//         removeListener: () => { },
//     };
// };


// Setting up mock for the window object, if needed
Object.defineProperty(window, 'scrollTo', {
    value: () => { },
    writable: true,
});

// Mock for intersection observer
class MockIntersectionObserver {
    observe() { }
    disconnect() { }
    unobserve() { }
}

window.IntersectionObserver = MockIntersectionObserver as any;
jest.mock('./config');
beforeEach(() => {
    jest.clearAllMocks();
});
