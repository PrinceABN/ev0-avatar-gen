import React, { useState } from 'react';
import html2canvas from 'html2canvas'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Typography, TextField, Container } from '@material-ui/core';
import { SketchPicker } from 'react-color';
import { EvolveLogo } from './Components/Logos';

function App() {
  const [name, setName] = useState("bay");
  const [fontSize, setFontSize] = useState(74);
  const [logoFilterColor, setLogoFilterColor] = useState("#FFFFF");
  const [logoStripeColor, setLogoStripeColor] = useState("#FFFFF");
  const [textColor, setTextColor] = useState({a: 1, b: 255, g: 255, r: 255});
  const [borderColor, setBorderColor] = useState({a: 1, b: 255, g: 255, r: 255});

  const dynamicStyles = makeStyles(theme => ({
    resultWrapper: {
      flexGrow: 1,
      border: '1px solid black',
      width: '512px',
      height: '512px',
      backgroundImage: `url(${process.env.PUBLIC_URL}/assets/backgrounds/1.png)`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain'
    },
    logoWrapper: {
      backgroundSize: 'contain',
      margin: '0 auto',
      width: '500px',
      height: '500px',
      border: `7px solid rgba(${borderColor.r}, ${borderColor.g}, ${borderColor.b}, ${borderColor.a})`,
      borderRadius: '100%',
    },
    logo: {
      margin: '0 auto',
      width: '333px',
      height: '258px',
      position: 'relative'
    },
    logoItems: {
      position: 'relative'
    },
    textWrapper: {
      color: `rgba(${textColor.r}, ${textColor.g}, ${textColor.b}, ${textColor.a})`,
      fontSize: `${fontSize}px`,
      fontFamily: 'SFProDisplay-BlackItalic'
    }
  }))()

  const handleNameChange = event => setName(event.target.value);
  const handleFontSizeChange = event => setFontSize(event.target.value);
  const handleLogoFilterColorChange = (color) => setLogoFilterColor(color.hex);
  const handleLogoStripeColorChange = (color) => setLogoStripeColor(color.hex);
  const handleTextColorChange = (color) => setTextColor(color.rgb);
  const handleBorderColorChange = (color) => setBorderColor(color.rgb);
  const handleSave = () => {
    html2canvas(document.querySelector("#resultImg")).then(canvas => {
      document.body.appendChild(canvas);
    });
  }
  return (
    <React.Fragment>
      <Container>
        <Grid container direction="column" spacing={2} justify="center" alignItems="center">
          <Grid item>
            <Grid id="resultImg" container className={dynamicStyles.resultWrapper}>
              <Grid container justify="center" alignItems="center" direction="column">
                <Grid container direction="column" justify="center" alignItems="center" item className={dynamicStyles.logoWrapper}>
                  <Grid item className={dynamicStyles.logo}>
                    <EvolveLogo className={dynamicStyles.logoItems} logoFill={logoFilterColor} stripeFill={logoStripeColor}/>
                  </Grid>
                  <Grid item><Typography className={dynamicStyles.textWrapper}>{name}</Typography></Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item id="controls" justify="center" alignItems="center" spacing={2} container direction="column">
            <Grid item><Button variant="outlined" onClick={handleSave}>Save</Button></Grid>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <TextField id="outlined-name" label="Name" variant="outlined" value={name} onChange={handleNameChange} />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-name"
                  label="Font Size"
                  variant="outlined"
                  value={fontSize}
                  onChange={handleFontSizeChange}
                  type="number"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Typography>Color of Logo Filter</Typography>
                <SketchPicker
                  color={logoFilterColor}
                  id="logoFilterColor"
                  onChangeComplete={handleLogoFilterColorChange}
                />
              </Grid>
              <Grid item>
                <Typography>Color of Logo Stripe</Typography>
                <SketchPicker
                  color={logoStripeColor}
                  id="logoStripeColor"
                  onChangeComplete={handleLogoStripeColorChange}
                />
              </Grid>
              <Grid item>
                <Typography>Color of Text</Typography>
                <SketchPicker
                  color={textColor}
                  id="textColor"
                  onChangeComplete={handleTextColorChange}
                />
              </Grid>
              <Grid item>
                <Typography>Color of Border</Typography>
                <SketchPicker
                  color={borderColor}
                  id="borderColor"
                  onChangeComplete={handleBorderColorChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
