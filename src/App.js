
import './App.css';

import {Fragment, useEffect, useState} from "react";
import {Button, Card, drawer, Input} from "@material-tailwind/react";
import axios from "axios";
import LineChart from "./Components/Grafica";
const puerta_0=require('./assets/img/puerta_0.PNG');
const puerta_1=require('./assets/img/puerta_1.PNG');
const termometro_0=require('./assets/img/termometro_0.png');
const termometro_1=require('./assets/img/termometro_1.png');
const URL='http://localhost:5000/'
function App() {
    const [puerta,setPuerta]=useState(0);
    const [termometro,setTermometro]=useState(0);
    //dostos para la grafica
    const [chartData,setChartData]=useState([]);
    //abrir la grafica
    const [open,setopen]=useState(false);
    //fechas
    const [fInicio,setFInicio]=useState('');
    const [fFin,setFFin]=useState('');
    //id para elegir el elmento pra mostrar la grafica
    const [elemId,setElemId]=useState('');

    //funciones
    const getElementos=async ()=>{
        const res=await axios.get(URL+1);
        setPuerta(res.data[0].status);

        const rta=await axios.get(URL+2);
        setTermometro(rta.data[0].status);
    }
    const handlePuerta=async ()=>{
        const newPuerta = puerta === 1 ? 0 : 1;
        setPuerta(newPuerta);
        const rta=await axios.get(URL+1+'/'+newPuerta)
        getGrafica(1);
        setopen(true);
        setElemId(1);

    }
    const handleTermometro=async ()=>{
        const newTermo = termometro === 1 ? 0 : 1;
        setTermometro(newTermo);
        const rta=await axios.get(URL+2+'/'+newTermo)
        getGrafica(2)
        setopen(true);
        setElemId(2);
    }

    const getGrafica=async (id) => {
        const rta = await axios.get(URL + 'grafica/' + id);
        setChartData(rta.data);
    }

    const getGraficaFechas=async () => {
        const opciones={
            'elemento':elemId,
            'inicio':fInicio,
            'fin':fFin,
            }
        const rta = await axios.post(URL + 'grafica-fecha',opciones);
        setChartData(rta.data);
    }

    useEffect(()=>{
        getElementos();
    },[]);

  return (
   <Fragment>
       <Card className='w-full h-full flex flex-col'>
           <Card className='flex flex-row justify-around m-10'>
                <Card onClick={handlePuerta}>
                    {puerta==1 ? (
                        <img src={puerta_1} alt="puerta" className='w-60'/>
                    ):(
                        <img src={puerta_0} alt="puerta" className='w-60'/>
                    )}
                </Card>
             <Card onClick={handleTermometro}>
                 {termometro==1 ? (
                     <img src={termometro_1} alt="termometro" className='w-60'/>
                 ):(
                     <img src={termometro_0} alt="termometro" className='w-60'/>
                 )}
             </Card>
           </Card>
           {open && (
               <Fragment>
                   <div className='border-2 flex flex-col items-center'>
                       <p>Fechas</p>
                       <div className=' flex justify-around p-4 gap-2'>
                           <Input label='Inicio' size='sm' className='mx-2' onChange={(e)=>{setFInicio(e.target.value)}}/>
                           <Input label='Fin' size='sm' className='mx-2' onChange={(e)=>{setFFin(e.target.value)}}/>
                           <Button className='mx-2' onClick={getGraficaFechas}>Buscar</Button>
                       </div>
                   </div>

                   <LineChart data={chartData} />
               </Fragment>
           )

           }


       </Card>

   </Fragment>
  );
}

export default App;
