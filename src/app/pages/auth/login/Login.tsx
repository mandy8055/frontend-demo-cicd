import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronDown, CirclePlay, Loader2, Podcast } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BROWN_MAIL, CONTACT_US_CONTENT } from 'src/app/common/constants';
import { useAppDispatch, useAppSelector } from 'src/app/common/hooks';
import { CustomInput, PageContainer } from 'src/app/components';
import { Button } from 'src/app/components/ui/button';
import { Popover, PopoverTrigger } from 'src/app/components/ui/popover';
import { selectLoginError } from 'src/app/store/selectors';
import { loginUser } from 'src/app/store/slices/authSlice';
import articleImage from 'src/assets/article-title.png';
import logoImage from 'src/assets/logo.png';
import { z } from 'zod';
import {
  ABOUT_TOUCHPOINT_LINK,
  ERROR_MESSAGE,
  NAVIGATING_OUR_WORLDS_LINK,
  READ_NOW_LINK,
  USERNAME_REGEX,
} from './constants';

const schema = z.object({
  username: z.string().min(6).regex(USERNAME_REGEX).trim().min(1),
  password: z.string().min(1),
});

type FormFields = z.infer<typeof schema>;

function LoginPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({ resolver: zodResolver(schema) });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const loginError = useAppSelector(selectLoginError);

  const submitHandler: SubmitHandler<FormFields> = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate('/');
    } catch (error) {
      setError('root', { message: loginError || ERROR_MESSAGE });
    }
  };

  return (
    <PageContainer className="min-h-full">
      <article className="flex flex-row">
        <section className="w-2/3">
          <img
            src={logoImage}
            className="mb-36 mt-12 ml-8 w-48 h-10"
            alt="BA-Logo"
          />
          <div className=" p-6">
            <h2 className="font-bold ml-4">Sign in</h2>
            <form onSubmit={handleSubmit(submitHandler)} className="m-4">
              <CustomInput
                id="username"
                {...register('username')}
                label="Username"
                type="text"
                placeholder="Enter your username"
              />
              <div className="mt-5">
                <CustomInput
                  id="password"
                  {...register('password')}
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
              {(errors.root || errors.username || errors.password) && (
                <p className="text-red-500 text-xs my-3">{ERROR_MESSAGE}</p>
              )}
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a
                  href="#forgot-password"
                  className="text-sm text-[#535353] font-medium"
                >
                  Forgot your password?
                </a>
              </div>
              <Button
                disabled={isSubmitting}
                className="bg-[#0d233d] w-full"
                type="submit"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    wait
                  </>
                ) : (
                  'Login'
                )}
              </Button>
            </form>
            <section>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="secondary"
                    className="bg-[#e6f1f9] m-4 rounded-3xl"
                  >
                    Take a Tour <ChevronDown className="ml-1" />
                  </Button>
                </PopoverTrigger>
              </Popover>
              <div className="flex ml-4 space-x-4 text-sm text-gray-700">
                <a
                  href={NAVIGATING_OUR_WORLDS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <Podcast color="#0d233d" />
                  <span>Navigating Our World</span>
                </a>
                <span className="text-lg">|</span>
                <a
                  href={ABOUT_TOUCHPOINT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1"
                >
                  <CirclePlay size={28} color="#fff" fill="#0d233d" />
                  <span>About TouchPoint</span>
                </a>
              </div>
              <hr className="my-4" />
              <div className="mt-8 text-sm text-gray-700">
                <p className="text-xs">
                  {CONTACT_US_CONTENT}
                  <a href={`mailto:${BROWN_MAIL}`} className="text-blue-500">
                    {BROWN_MAIL}
                  </a>
                </p>
                <p className="mt-2 text-xs">
                  If you are interested in learning more about TouchPoint, Brown
                  Advisory's client portal, please contact a member of your
                  client team.
                </p>
              </div>
              <div className="mt-8 text-xs text-gray-500 text-center space-x-4">
                <a href="#t&c" className="hover:underline">
                  Terms and conditions
                </a>
                <span className="font-extrabold">•</span>
                <a href="#privacy-policy" className="hover:underline">
                  Privacy policy
                </a>
              </div>
            </section>
          </div>
        </section>
        <section className="bg-[#e8ebf0] min-h-screen flex justify-center items-center">
          <div className="w-1/2 relative flex justify-center items-center mx-auto my-auto">
            <img src={articleImage} alt="strategic advisory 2024 outlook" />
            <a
              href={READ_NOW_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bg-primary text-white px-4 rounded-sm top-[250px] left-[250px] h-8 flex items-center justify-center"
            >
              Read Now
            </a>
          </div>
        </section>
      </article>
    </PageContainer>
  );
}
export default LoginPage;
