import unsplash from '../unsplash';

it ('calls axious and returns images', async () +> {
  const images = await unsplash('kittens');
  console.log(images)
})
