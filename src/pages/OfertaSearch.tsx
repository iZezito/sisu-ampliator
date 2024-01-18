import React, {useEffect, useState} from 'react';
import TituloPagina from "../components/TituloPagina.tsx";
import {AutoComplete, Empty, Flex, Input, Spin} from "antd";
import {useRootStore} from "../stores/RootStore.tsx";
import {observer} from "mobx-react-lite";
import CardOferta from "../components/CardOferta/CardOferta.tsx";
import {OfertaCurso} from "../stores/sisu";

const OfertaSearch: React.FC = observer(() => {
  const {sisuStore} = useRootStore();

  useEffect(() => {
    const fetchData = async () => {
      await sisuStore.getCategorias();
    };
    fetchData();
    return () => {
      sisuStore.clearOfertas();
    }
  }, [sisuStore]);

  const [inputValue, setInputValue] = useState<string>('');
  const [searchedCategorias, setSearchedCategorias] = useState([]);

  const handleSearch = async (value: string) => {
    setInputValue(value);
    const filteredCategorias = sisuStore.categorias.filter((categoria) =>
        categoria.label.toLowerCase().includes(value.toLowerCase())
    );
    setSearchedCategorias(filteredCategorias);
  };

  const handleSelect = (value: string, option: any) => {
    sisuStore.getOfertas(option.id);
    setSearchedCategorias([]);
    setInputValue('');
  };
  
  return (
      <React.Fragment>
        <TituloPagina>ADICIONAR OFERTAS</TituloPagina>
        <Flex gap="middle" wrap="wrap" justify="center">
          <AutoComplete
              style={{ width: '40%' }}
              options={searchedCategorias.map((categoria) => ({ value: categoria.label, id: categoria.id }))}
              onSelect={handleSelect}
              onSearch={handleSearch}
              value={inputValue}
              onChange={(value) => setInputValue(value)}>
            <Input.Search placeholder="Pesquisar" enterButton/>
          </AutoComplete>
        </Flex>
        <Flex gap="middle" wrap="wrap" justify="center" style={{height: '100%'}}>
          {sisuStore.loading ? (
              <Spin size="large"/>
          ) : sisuStore.ofertas.length === 0 ? (
              <Empty description={'Nenhuma oferta foi escolhida!'}/>
          ) : (
              sisuStore.ofertas.map((oferta: OfertaCurso) => (
                  <CardOferta oferta={oferta} loading={false} key={oferta?.co_oferta}/>
              ))
          )}
        </Flex>
      </React.Fragment>
  )
});

export default OfertaSearch;