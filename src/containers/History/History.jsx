import { useEffect, useState } from 'react';
// eslint-disable-next-line react/function-component-definition
const History = () => {
	const [animes, setAnimes] = useState([{ name: '', page: '' }]);

	useEffect(() => {
		chrome.storage.sync.get(['animes'], (result) => {
			setAnimes(result.animes);
		});
	}, [false]);

	const clearStorage = () => {
		chrome.storage.sync.clear();
		setAnimes([{ name: '', page: '' }]);
	};

	return (
		<div>
			{animes !== undefined &&
				animes.length > 0 &&
				animes.map((anime) => (
					<div>
						<span>
							{anime.mediaType === 'image' ? (
								<div>
									<img src={anime.srcUrl} width="30px" alt={anime.srcUrl} />
									{anime.pageUrl}
								</div>
							) : (
								<div>
									<span>
										{anime.selectionText} - {anime.pageUrl}
									</span>
								</div>
							)}
						</span>
						<br />
					</div>
				))}

			<br />
			<button type="button" onClick={() => clearStorage()}>
				Limpar
			</button>
		</div>
	);
};

export default History;
