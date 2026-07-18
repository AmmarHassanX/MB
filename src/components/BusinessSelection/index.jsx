import { Box, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { useDatafetcher } from "../../utilities/hooks/useDatafetcher";
import AgeRestriction from "../popup/AgeRestriction";
// import Particles from "react-tsparticles";
// import { loadFull } from "tsparticles";

const OutlinedButton = styled(Button)({
  fontSize: "20px",
  textTransform: "capitalize",
  color: "#fff",
  height: "73px",
  border: "1px solid #fff",
  padding: "20px",
  width: "250px",
  borderRadius: 0,
  transition: "all 1s ease ",
  margin: "0 auto",
  ":hover": {
    // background: "#000",
    transform: "scale(1.1) translateZ(0px)",
  },
});

// const Tsparticales = ({ image }) => {
//   const particlesInit = useCallback(async (engine) => {
//     // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
//     // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
//     // starting from v2 you can add only the features you need reducing the bundle size
//     await loadFull(engine);
//   }, []);

//   const particlesLoaded = useCallback(async (container) => {
//     await console.log(container);
//   }, []);

//   return (
//     <Box height={600}>
//       <Particles
//         id="tsparticles"
//         init={particlesInit}
//         loaded={particlesLoaded}
//         options={{
//           background: {
//             image: `url(
//               ${image}
//             )`,
//             repeat: "no-repeat",
//             size: "contain",
//             position: "center",
//           },
//           fpsLimit: 120,
//           Poppinsactivity: {
//             events: {
//               onClick: {
//                 enable: true,
//                 mode: "push",
//               },
//               onHover: {
//                 enable: true,
//                 mode: "repulse",
//               },
//               resize: true,
//             },
//             modes: {
//               push: {
//                 quantity: 4,
//               },
//               repulse: {
//                 distance: 200,
//                 duration: 0.4,
//               },
//             },
//           },
//           particles: {
//             color: {
//               value: "#ffffff",
//             },
//             links: {
//               color: "#ffffff",
//               distance: 150,
//               enable: true,
//               opacity: 0.5,
//               width: 1,
//             },
//             collisions: {
//               enable: true,
//             },
//             move: {
//               directions: "none",
//               enable: true,
//               outModes: {
//                 default: "bounce",
//               },
//               random: false,
//               speed: 6,
//               straight: false,
//             },
//             number: {
//               density: {
//                 enable: true,
//                 area: 800,
//               },
//               value: 80,
//             },
//             opacity: {
//               value: 0.5,
//             },
//             shape: {
//               type: "edge",
//             },
//             size: {
//               value: { min: 1, max: 5 },
//             },
//           },
//           detectRetina: true,
//         }}
//       />
//     </Box>
//   );
// };

export default function Index({ setBusinessId }) {
  const { data, error } = useDatafetcher("/store/businessType", true);
  const [index, setIndex] = React.useState(null);
  const [show, setShow] = React.useState(true);

  return (
    <Box>
      {show && (
        <AgeRestriction showAge={show} setShowAge={() => setShow(false)} />
      )}
      <Box
        sx={{
          width: "100%",
          position: "fixed",
          top: "0",
          left: 0,
          alignItems: "center",
          display: "flex",
          justifyContent: "space-around",
          height: "100vh",
          background: "#EAEAEA",
          backgroundImage: "url(/images/home/businessSection/1.jpeg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
      >
        {/* <Tsparticales image={data && data?.[0].imageUrl} /> */}
        {data?.map((v, i) => (
          <OutlinedButton
            key={i}
            onClick={() => {
              sessionStorage.setItem("businessId", v.id);
              setBusinessId(v.id);
            }}
            onMouseEnter={() => setIndex(i)}
            onMouseLeave={() => setIndex(null)}
          >
            {i === index ? v?.description || v?.name : v?.name}
          </OutlinedButton>
        ))}
      </Box>
    </Box>
  );
}
