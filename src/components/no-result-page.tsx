function NoResultPage() {
  return (
    <div className="flex items-center justify-center  border-opacity-80 px-16 py-8 opacity-90">
      <div className="flex flex-col items-center">
        <img className="w-[40vw] rounded-[100%]" src="../public/no-result.png" alt="Something went wrong ;v" />
        <p className="py-4 text-3xl font-bold text-orange-600">No result found</p>
      </div>
    </div>
  )
}
export default NoResultPage
