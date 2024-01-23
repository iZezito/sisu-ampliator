import {Button, Modal, Card, Col, Divider, Flex, Select} from "antd";
import React, {useState} from "react";
import {CardProps} from "./index";
import {Typography} from "antd";

const {Text} = Typography;
import {Line} from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {useRootStore} from "../../stores/RootStore.tsx";
import {Modalidade, OfertaCurso} from "../../stores/sisu";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
);


const CardOferta: React.FC<CardProps> = ({oferta, loading, onButtonClick}) => {
    const {sisuStore, userStore} = useRootStore();
    const [selectOptions, setSelectOptions] = useState<object[]>([]);
    const [selectValue, setSelectValue] = useState<string>('');
    const [dados, setDados] = useState<{ x: string, y: number }[]>(
        [{x: 'Dia 23', y: 0},]);
    const [media, setMedia] = useState<number>(545);

    const labelsChart = ['22', '23', '24', '25', '26'];

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Avanço das Notas de Corte',
            },
        },
        scales: {
            x: {
                type: 'category',
                labels: ['Dia 22', 'Dia 23', 'Dia 24', 'Dia 25', 'Dia 26'],
            },
            y: {
                beginAtZero: false,
                max: media > dados.reduce((max, p) => p.y > max ? p.y : max, dados[0].y) + 10 ? media + 10 : dados.reduce((max, p) => p.y > max ? p.y : max, dados[0].y) + 10,
                min: media < dados.reduce((min, p) => p.y < min ? p.y : min, dados[0].y) - 10 ? media - 10 : dados.reduce((min, p) => p.y < min ? p.y : min, dados[0].y) - 10,
            },
        },
    }; // Ajuste conforme necessário

    const data = {
        datasets: [
            {
                label: 'Nota de Corte',
                data:dados,
                borderColor: 'rgb(19,255,0)',
                backgroundColor: 'rgba(0,0,0,0.5)',
                type: 'line',
            },
            {
                label: 'Sua Média',
                data: [
                    {x: 'Dia 23', y: media},
                    {x: 'Dia 24', y: media},
                    {x: 'Dia 25', y: media},
                ],
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(255,249,0,0.5)',
                type: 'line',
            },
        ],
    };


    const [open, setOpen] = useState<boolean>(false);

    const showModal = async () => {
        await sisuStore.getModalidades(oferta?.oferta.co_oferta);
        setSelectOptions(sisuStore.modalidades.map((modalidade: Modalidade) => {
            return {
                value: modalidade.no_concorrencia,
                label: modalidade.no_concorrencia
            }
        }));
        setMedia(calcularPontuacaoPonderada(oferta?.oferta));
        console.log(media);
        setOpen(true);
    }

    const handleOk = () => {
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }
    //TODO: Consertar o label correto
    const handleChangeSelect = (value: string) => {
        setSelectValue(value);
        const data = oferta.historico.filter((modalidade: Modalidade) => modalidade.no_concorrencia === value);
        const dataChart: { x: string, y: number }[] = [];
        labelsChart.forEach((label) => {
            for (let i = 0; i < data.length; i++) {
                const dia = new Date(data[i].dia)
                console.log(dia.getDate(), +label);
                if (dia.getDate() === +label && data[i].nu_nota_corte !== null) {
                    dataChart.push({x: `Dia ${label}`, y: +data[i].nu_nota_corte});
                    break;
                }

            }
        });
        console.log(dataChart.length);
        if (dataChart.length === 0){
            return;
        }
        setDados(dataChart);

    }

    const calcularPontuacaoPonderada = (oferta: OfertaCurso): number => {
        const { minhasNotas } = userStore;
        const pesoCN = parseFloat(oferta.nu_peso_cn);
        const pesoCH = parseFloat(oferta.nu_peso_ch);
        const pesoM = parseFloat(oferta.nu_peso_m);
        const pesoL = parseFloat(oferta.nu_peso_l);
        const pesoR = parseFloat(oferta.nu_peso_r);

        const pontuacaoPonderada =
            (minhasNotas.cienciasNatureza * pesoCN) +
            (minhasNotas.cienciasHumanas * pesoCH) +
            (minhasNotas.matematica * pesoM) +
            (minhasNotas.linguagens * pesoL) +
            (minhasNotas.redacao * pesoR);

        const mediaPonderada = pontuacaoPonderada / (pesoCN + pesoCH + pesoM + pesoL + pesoR);
        console.log('Média Ponderada:', mediaPonderada);
        return mediaPonderada;
    };

    return (
        <>
            <Card hoverable title={oferta?.oferta.no_curso}
                  style={{width: '28%', minWidth: 350, cursor: 'pointer', transition: 'box-shadow 0.3s'}}
                  onClick={showModal} loading={loading}
            >
                <Flex vertical={false} gap="middle" align="center" justify={'space-between'}>
                    <Col>
                        <Text strong={true}>Grau</Text>
                        <p>{oferta?.oferta.no_grau}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Turno</Text>
                        <p>{oferta?.oferta.no_turno}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Código</Text>
                        <p>{oferta?.oferta.co_curso}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Ingresso</Text>
                        <p>{oferta?.oferta.qt_vagas_sem1 !== '0' ? '1º Semestre' : '2º Semestre'}</p>
                    </Col>
                </Flex>
                <Divider type={'horizontal'}/>
                <Flex vertical={true}>
                    <Text strong={true}>{oferta?.oferta.no_ies}</Text>
                    <Text strong={true}>{oferta?.oferta.no_campus}</Text>
                </Flex>
                <Flex vertical={true}>
                    <Button type={'text'} danger onClick={() => onButtonClick(oferta?.oferta.co_oferta)}>Remover
                        Opção</Button>
                </Flex>
            </Card>
            <Modal
                styles={{
                    mask: {
                        backdropFilter: 'blur(10px)',
                    }
                }}
                title={oferta?.oferta.no_curso}
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Fechar
                    </Button>,
                ]}
            >
                <Flex vertical={false} gap="middle" align="center" justify={'space-between'}>
                    <Col>
                        <Text strong={true}>Grau</Text>
                        <p>{oferta?.oferta.no_grau}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Turno</Text>
                        <p>{oferta?.oferta.no_turno}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Código</Text>
                        <p>{oferta?.oferta.co_curso}</p>
                    </Col>
                    <Col>
                        <Text strong={true}>Ingresso</Text>
                        <p>{oferta?.oferta.qt_vagas_sem1 !== '0' ? '1º Semestre' : '2º Semestre'}</p>
                    </Col>
                </Flex>
                <Divider type={'horizontal'}/>
                <Flex vertical={true}>
                    <Text strong={true}>{oferta?.oferta.no_ies}</Text>
                    <Text strong={true}>{oferta?.oferta.no_campus}</Text>
                </Flex>
                <Divider type={'horizontal'}/>
                <Flex vertical={true} gap="middle" align="center">
                    <Text strong={true}>Selecione o tipo da concorrência</Text>
                    <Select
                        style={{width: 350}}
                        options={selectOptions}
                        onChange={(value) => handleChangeSelect(value)}
                    />
                </Flex>
                <Line options={options} data={data}/>
            </Modal>
        </>
    );
}

export default CardOferta;