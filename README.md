[![LinkedIn][linkedin-shield]][linkedin-url]

# Avatar Upload & Crop Component Challenge

<!-- ABOUT THE PROJECT -->

## About The Project

This project aims to provide a React component for developers to let users upload and crop their avatar images. The component is built using TypeScript to provide a solid type system and improved maintainability.

### Built With

-   [![React][react.js]][react-url]

<!-- GETTING STARTED -->

## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

Before using this tool, make sure that you have installed the following:

-   [Node.js](https://nodejs.org/en/)
-   Any IDE (VsCode, Webstrome, Intelij)

### Installation

1. Clone the repo
    ```sh
    git clone https://github.com/AntonioMRH/image-cropper-challenge.git
    ```
2. Access your local copy of the repo and install packages (I'm using PNPM but feel free to use you preferred package manager)
    ```sh
    pnpm install
    ```
3. Run the application in your browser
    ```sh
    pnpm dev
    ```

-   Testing the application:
    ```sh
    pnpm test
    ```

<!-- USAGE EXAMPLES -->

## Usage

Use this space to show useful examples of how a project can be used. Additional screenshots, code examples and demos work well in this space. You may also link to more resources.

_For more examples, please refer to the [Documentation](https://example.com)_

## Goals

-   [x] It should allow uploading an image by dragging it into the dashed area or clicking on it.
-   [x] Throughout the entire process, the user can click on the "X" icon to cancel and return to the initial state
-   [x] After uploading, the user can adjust the image to better fit the circular format. Using a slider, the user can zoom in and out on the image cut out by the circular mask to preview the final result.
-   [x] Clicking on save, the component should display the cropped logo and a button to restart the process. It must also provide some way for parent components to access the resulting image's raw data.

**Note:** The final item specified that the component should include a restart button, however, the design for the last step of the process does not contain such a button. Nevertheless, I have strictly followed the design and implemented the app layout accordingly.

<!-- CONTACT -->

## Contact

Antonio Moreno - amrh07@gmail.com

Project Link: [https://github.com/your_username/repo_name](https://github.com/AntonioMRH/image-cropper-challenge)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/antonio-mrh/
[react.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[react-url]: https://reactjs.org/
