import * as React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Loading(props) {
  return (
    <Box sx={{ height: "80vh", position: 'relative', display: 'flex', justifyContent:'center', alignItems: 'center' }}>
      <CircularProgress variant="determinate" {...props} size={"250px"} />
      <Box
        sx={{
          // top: 0,
          // left: 0,
          // bottom: 0,
          // right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="div" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

Loading.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};

export default function CircularStatic() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 1));
    }, 350);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <Loading value={progress} />;
}