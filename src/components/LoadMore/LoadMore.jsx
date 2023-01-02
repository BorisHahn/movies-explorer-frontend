import './LoadMore.css';
const LoadMore = ({ loadMore, isLoadButtonVisible }) => {
  const handleLoad = () => {
    loadMore();
  };
  const loadButtonClass = isLoadButtonVisible
    ? 'load-more'
    : 'load-more load-more_hide';
  return (
    <div className={loadButtonClass}>
      <button type='button' className='load-more__button' onClick={handleLoad}>
        Ещё
      </button>
    </div>
  );
};

export default LoadMore;
