import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useRootStore } from './stores/RootStore.tsx';
import GenericTable from "./components/GenericTable/GenericTable.tsx";

const App: React.FC = observer(() => {
    const { sisuStore } = useRootStore();

    useEffect(() => {
        const fetchData = async () => {
            await sisuStore.getModalidades();
        };
        fetchData();
    }, [sisuStore]); // Adicionei sisuStore como dependência para evitar warnings

    return (
        <div className={'container'}>
            <GenericTable data={sisuStore.modalidades} loading={sisuStore.loading}/>
        </div>
    );
});

export default App;