const fetchAnimeData = async (animeName) => {
  const query = `
    query ($animeName: String) {
      Page {
        media(search: $animeName, type: ANIME) {
          id
          title {
            english
            native
          }
          siteUrl
          description
        }
      }
    }
  `;

  const variables = {
    animeName,
  };

  const url = 'https://graphql.anilist.co';
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Anilist API request failed:', error);
    throw error;
  }
};

export { fetchAnimeData };
