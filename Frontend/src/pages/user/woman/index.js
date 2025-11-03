import { Typography, Grid, Tabs, Tab, Box } from "@mui/material"
import PropTypes from 'prop-types';
import { MainTabWoman } from './tabs/index.js'
import { useFetchInitMan } from '../../../hooks/woman/index.js'

const WomanPage = () => {

    const MainTabs = MainTabWoman()
    const { AllProductsTab, FootwarTab, PantsTab, BlousesTab } = MainTabs


    const womanHook = useFetchInitMan()
    const {valueTab, handleChangeValueTab} = womanHook

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;
      
        return (
          <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
          >
            {value === index && <Box sx={{ paddingTop: '30px' }}>{children}</Box>}
          </div>
        );
    }
      
    CustomTabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.number.isRequired,
      value: PropTypes.number.isRequired,
    };


    return(
        <>
        <Grid container spacing={0}>
            <Grid size={{ lg: 4, md: 12, sm: 12, xs: 12 }}>
                <Typography fontSize={40} fontWeight={400}>Mujer</Typography>
            </Grid>
            <Grid size={{ lg:8, md: 12, sm: 12, xs: 12 }}>
                <Tabs value={valueTab} onChange={handleChangeValueTab}>
                    <Tab {...a11yProps(0)} label='Todos los productos' />
                    <Tab {...a11yProps(1)} label='Calzado' />
                    <Tab {...a11yProps(2)} label='Blusas' />
                    <Tab {...a11yProps(3)} label='Pantalones' />
                </Tabs>
            </Grid>
        </Grid>

        <CustomTabPanel value={valueTab} index={0}>
            <AllProductsTab useFetchInit={womanHook} />
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={1}>
            <FootwarTab />
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={2}>
            <BlousesTab />
        </CustomTabPanel>
        <CustomTabPanel value={valueTab} index={3}>
            <PantsTab />
        </CustomTabPanel>
        </>
    )
}

export default WomanPage