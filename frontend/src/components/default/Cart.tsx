
export default function Cart() {
  const accessToken = sessionStorage.getItem('ACCESS_TOKEN');

  return (
	<>
    {!accessToken && (
      <p> Please login and add products into your cart </p>
    )}

    {accessToken && (
      <p>wellcome to your cart</p>
    )}
  </>
  )
}
