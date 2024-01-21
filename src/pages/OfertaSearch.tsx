import React, { useEffect, useState, useMemo } from 'react';
import TituloPagina from "../components/TituloPagina.tsx";
import { AutoComplete, Empty, Flex, Input, Spin } from "antd";
import { useRootStore } from "../stores/RootStore.tsx";
import { observer } from "mobx-react-lite";
import { OfertaCurso } from "../stores/sisu";
import CardOfertaSearch from "../components/CardOferta/CardOfertaSearch.tsx";

const OfertaSearch: React.FC = observer(() => {
  const { sisuStore } = useRootStore();

  useEffect(() => {
    const fetchData = async () => {
      await sisuStore.getCategorias();
    };
    fetchData();
    return () => {
      sisuStore.clearOfertas();
    };
  }, [sisuStore]);

  const [inputValue, setInputValue] = useState<string>('');
  const [searchedCategorias, setSearchedCategorias] = useState([]);

  const options = useMemo(
      () =>
          searchedCategorias.map((categoria) => ({
            value: categoria.label,
            id: categoria.id,
          })),
      [searchedCategorias]
  );

  const handleSearch = (value: string) => {
    console.log('valor campo: ', value);
    console.log('categorias tamanho: ', sisuStore.categorias.length);
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
      <>
        <TituloPagina>ADICIONAR OFERTAS</TituloPagina>
        <Flex gap="middle" wrap="wrap" justify="center">
          <AutoComplete
              className={'search-bar'}
              style={{ width: '50%' }}
              options={options}
              onSelect={handleSelect}
              onSearch={handleSearch}
              value={inputValue}
              onChange={(value) => setInputValue(value)}
          >
            <Input.Search placeholder="Pesquisar" enterButton />
          </AutoComplete>
        </Flex>
        <Flex gap="middle" wrap="wrap" justify="center" style={{ height: '100%' }}>
          {sisuStore.loading ? (
              <Spin size="large" />
          ) : sisuStore.ofertas.length === 0 ? (
              <Empty description={'Nenhuma oferta foi escolhida!'} />
          ) : (
              sisuStore.ofertas.map((oferta: OfertaCurso) => (
                  <CardOfertaSearch oferta={oferta} loading={false} key={oferta?.co_oferta} onButtonClick={sisuStore.insertOfertaPreferencia}/>
              ))
          )}
        </Flex>
      </>
  );
});

export default OfertaSearch;