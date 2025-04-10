import { Typography, Row, Col, Card, Button } from 'antd';
import {
  BookOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const features = [
  {
    icon: <BookOutlined className='text-2xl text-primary' />,
    title: 'Extensive Collection',
    description:
      'Discover thousands of titles across all genres, from bestsellers to rare finds.',
  },
  {
    icon: <ShoppingOutlined className='text-2xl text-primary' />,
    title: 'Fast Delivery',
    description:
      'Get your books delivered to your doorstep within 2-3 business days.',
  },
  {
    icon: <CustomerServiceOutlined className='text-2xl text-primary' />,
    title: 'Expert Recommendations',
    description:
      'Our team of book lovers is always ready to help you find your next great read.',
  },
  {
    icon: <SafetyOutlined className='text-2xl text-primary' />,
    title: 'Secure Payments',
    description:
      'Shop with confidence using our secure and encrypted payment system.',
  },
];

const AboutSection = () => {
  return (
    <section className='py-16 bg-secondary-light'>
      <div className='container px-4 mx-auto md:px-0'>
        <Row gutter={[48, 48]} align='middle'>
          <Col xs={24} md={12}>
            <div className='max-w-lg'>
              <Title
                level={2}
                className='!text-2xl md:!text-3xl !font-bold !mb-4 !text-primary-dark'
              >
                Why Choose Our Bookshop?
              </Title>
              <Paragraph className='mb-6 text-gray-700'>
                At our bookshop, we believe that books have the power to
                inspire, educate, and transform lives. We're passionate about
                connecting readers with stories that resonate with them.
              </Paragraph>
              <Paragraph className='mb-6 text-gray-700'>
                Founded in 2023, we've grown from a small corner store to a
                beloved community hub for book lovers. Our mission is to make
                quality literature accessible to everyone.
              </Paragraph>
              <Link to='/about'>
                <Button
                  type='primary'
                  size='large'
                  className='!bg-primary !text-white hover:!bg-primary-dark'
                >
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              {features.map((feature, index) => (
                <Col xs={12} key={index}>
                  <Card className='!h-full !border !border-gray-100 !shadow-sm !transition-shadow hover:!shadow-md'>
                    <div className='text-center'>
                      <div className='inline-flex justify-center items-center mb-4 rounded-full size-14 bg-secondary'>
                        <span className='text-primary'>{feature.icon}</span>
                      </div>
                      <Title
                        level={4}
                        className='!mt-2 !mb-2 !text-base !font-semibold'
                      >
                        {feature.title}
                      </Title>
                      <Text className='text-sm text-gray-600'>
                        {feature.description}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default AboutSection;
