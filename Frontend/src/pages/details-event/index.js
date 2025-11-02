import { Button, Card, Tab, Tabs, Box } from "@mui/material"
import PropTypes from 'prop-types';
import { useFetchInitDetailsEvent } from "../../hooks/details-event"
import { useEffect } from "react"
import { useParams } from 'react-router-dom'
import HeaderInvitaPRO from "../../components/header"
import { MainTabDetailsEvent } from './tabs/index'
import './index.css'

const DetailsEventPage = () => {
    const { id_event } = useParams()
    const detailsEventHook = useFetchInitDetailsEvent()
    const { fetchDeatilsEvent, handleChangeIdEvent, handleChangeValueTab, valueTab } = detailsEventHook
    const MainTabs = MainTabDetailsEvent()
    const { ConfigurationTab, AttendanceTab, GuestsTab } = MainTabs
    const {detailsEvent, loadingDetailsEvent } = fetchDeatilsEvent
    
    useEffect(() => {
        handleChangeIdEvent(id_event)
        // eslint-disable-next-line
    }, [id_event])
    

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
            {value === index && <Box sx={{ padding: '0 24px 0 24px' }}>{children}</Box>}
          </div>
        );
      }
      
      CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };

      function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }
    
    
    return(
        <>
        {loadingDetailsEvent && (
            <>
            <div className='container-header-button'> 
                <HeaderInvitaPRO titlePage={detailsEvent.event_name} goBack={true} />
                <Button variant="outlined" >Leer QR</Button>
            </div>

            <Card sx={{paddingTop: '0', paddingLeft: '0', paddingRight: '0'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={valueTab} onChange={handleChangeValueTab}>
                        <Tab {...a11yProps(0)} label='Configuracion' />
                        <Tab {...a11yProps(1)} label='Asistencia' />
                        <Tab {...a11yProps(2)} label='Invitados' />
                    </Tabs>
                </Box>
                <CustomTabPanel value={valueTab} index={0}>
                    <ConfigurationTab useFetchInit={detailsEventHook}/>
                </CustomTabPanel>
                <CustomTabPanel value={valueTab} index={1}>
                    <AttendanceTab />
                </CustomTabPanel>
                <CustomTabPanel value={valueTab} index={2}>
                    <GuestsTab />
                </CustomTabPanel>
            </Card>
            </>
        )}
        </>
    )
}

export default DetailsEventPage