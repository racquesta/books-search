import React from 'react';
import { Card, Col, Grid, Row, Tag, Typography, Spin } from 'antd';
import { getBooks } from '../../api/books/getBooks';
import { Book, Books, BookSearchFields } from '../../api/books/types';
import CustomForm from '../../components/Form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { DEFAULT_SEARCH_PARAMS } from '../../api/books/config';
import { filterConfig, searchFormConfig } from './sampleFormConfigs';

const { useBreakpoint } = Grid;
const { Title } = Typography;

// TODO: start - move to a better place
const mapping = {
  epub: (book: Book) => book.accessInfo.epub?.isAvailable,
  pdf: (book: Book) => book.accessInfo.pdf?.isAvailable,
  isEbook: (book: Book) => book.saleInfo.isEbook,
};

type Mapping = keyof typeof mapping;
// TODO: end - move to a better place

const Main: React.FC = () => {
  const [searchValues, setSearchValues] = React.useState({
    title: '',
    author: '',
    subject: '',
  });
  const [books, setBooks] = React.useState<Books>([]);
  const [error, setError] = React.useState('');
  const [lastResultLength, setLastResultLength] = React.useState(0);
  const [filters, setFilters] = React.useState<Mapping[]>([]);

  const { sm, md, xl } = useBreakpoint();

  const handleGetBooks = async (values: BookSearchFields, searchIndex = 0) => {
    try {
      const booksRes = await getBooks(values, searchIndex); // TODO: grouped state changes should be held in one state object or handled by reduce, not batched since async
      setBooks((searchIndex === 0 ? [] : books).concat(booksRes.items || [])); // This is  untestable and I realize it's 💩
      setLastResultLength(booksRes.items ? booksRes.items.length : 0);
      setError('');
    } catch (err) {
      setBooks([]);
      setLastResultLength(0);
      setError((err as Error).message);
    }
  };

  const onFinish = async (values: BookSearchFields) => {
    setSearchValues(values);
    handleGetBooks(values);
  };

  const loadMoreData = async () => {
    handleGetBooks(searchValues, books.length);
  };

  const onValuesChange = async (
    _values: Record<string, string[]>,
    allValues: Record<string, string[]>,
  ) => {
    setFilters(Object.values(allValues).flat() as Mapping[]);
  };

  const filterBooks = (books: Books, filters: Mapping[]): Books => {
    // prevent unecessary work
    if (!filters.length) {
      return books;
    }

    return books.filter((book) => {
      for (const filter of filters) {
        if (filter && !mapping[filter](book)) {
          return false;
        }
      }

      return true;
    });
  };

  //   TODO: move to helper file
  const filteredBooks = filterBooks(books, filters); //state changes always involve these so not worth memoizing

  return (
    <div style={{ width: '85%', margin: `32px auto` }}>
      <CustomForm
        submitBtn
        resetBtn
        formName='search-form'
        formConfig={searchFormConfig}
        onFinish={onFinish}
      />

      {error && (
        <div>
          <p>{error}</p>
        </div>
      )}

      {books.length ? (
        <>
          <CustomForm
            formName='filterForm'
            formConfig={filterConfig}
            onValuesChange={onValuesChange}
          />
          {/* Should be abstracted as a wrapper with children */}
          <InfiniteScroll
            dataLength={books.length}
            next={loadMoreData}
            hasMore={lastResultLength === parseInt(DEFAULT_SEARCH_PARAMS.maxResults)}
            loader={
              <div style={{ display: 'flex', justifyContent: 'center', margin: '32px' }}>
                <Spin />
              </div>
            }
            endMessage={
              <div style={{ display: 'flex', justifyContent: 'center', margin: '32px' }}>
                <p>
                  <strong>End of Results</strong>
                </p>
              </div>
            }
          >
            <Row gutter={[40, 40]}>
              {filteredBooks.map((book, i) => {
                return (
                  // So many improvements can happen here,
                  // abstraction
                  // truncating of text for display
                  <Col key={`${book.id}-${i}`} xs={24} sm={12} md={8} lg={6} xl={4}>
                    <a href={book.volumeInfo.previewLink} rel='noopener noreferrer' target='_blank'>
                      <span className='screen-reader-only'>(opens in a new tab)</span>
                      <Card
                        style={{ height: '100%' }}
                        hoverable
                        cover={
                          <img
                            style={{
                              height: `${xl ? '240px' : md ? '280px' : sm ? '360px' : 'auto'}`,
                            }}
                            alt='example'
                            src={
                              book.volumeInfo.imageLinks?.thumbnail ||
                              'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png'
                            }
                          />
                        }
                      >
                        {/* Design hack: likely an accessibility no-no */}
                        <Title level={5}>{book.volumeInfo.title}</Title>
                        {(book.volumeInfo.authors || []).map((author) => {
                          return <p key={`${author}-${book.id}-${i}}`}>{author}</p>;
                        })}
                        {(book.volumeInfo.categories || []).map((category) => {
                          return (
                            <Tag
                              style={{
                                display: 'inline-block',
                                maxWidth: '100%',
                                whiteSpace: 'break-spaces',
                              }}
                              key={`${category}-${book.id}-${i}}`}
                            >
                              {category}
                            </Tag>
                          );
                        })}
                      </Card>
                    </a>
                  </Col>
                );
              })}
            </Row>
          </InfiniteScroll>
        </>
      ) : null}
    </div>
  );
};

export default Main;
