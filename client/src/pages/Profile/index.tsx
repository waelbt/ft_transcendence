import { useState, useEffect, useMemo } from 'react';
import MatchTable from '../../components/MatchTable';
import { Column, Match, Player } from '../../../../shared/types';

export function Profile() {
    const [data, setData] = useState<Match[]>([]);
    const columns = useMemo<Column<Match>[]>( // Remove the generic <Match> from here
        () => [
            {
                Header: 'Players',
                accessor: (row: Match) =>
                    row.players
                        .map(
                            (player: Player) =>
                                `${player.name} (${player.rating})`
                        )
                        .join(' vs ')
            },
            {
                Header: 'Result',
                accessor: 'result'
            },
            {
                Header: 'Awarded',
                accessor: 'awarded'
            },
            {
                Header: 'Date',
                accessor: 'date'
            }
        ],
        []
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/matches');
                const matches: Match[] = await response.json();
                setData(matches);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []);

    return (
        // gap-20
        <div className="flex-grow flex-col justify-center items-center inline-flex">
            {/* profile card <UserProfileCard/> */}
            <MatchTable columns={columns} data={data} />;
        </div>
    );
}
