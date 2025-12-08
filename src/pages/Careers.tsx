import { MapPin, Briefcase, Users, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const jobListings = [
  {
    id: 1,
    title: 'Senior Web Developer',
    department: 'Development',
    type: 'Full-time',
    location: 'Vadodara, India',
    salary: '₹12,00,000 - ₹18,00,000/year',
    experience: '5+ years',
    posted: '2 days ago',
    description: 'We are looking for an experienced web developer to join our dynamic team and lead frontend projects.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 2,
    title: 'UI/UX Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Vadodara, India',
    salary: '₹8,00,000 - ₹12,00,000/year',
    experience: '3+ years',
    posted: '5 days ago',
    description: 'Join our creative team to design beautiful and intuitive user interfaces for web and mobile applications.',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Wireframing'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Vadodara, India',
    salary: '₹6,00,000 - ₹10,00,000/year',
    experience: '4+ years',
    posted: '1 week ago',
    description: 'Lead our digital marketing efforts and develop strategies to increase brand visibility and customer acquisition.',
    skills: ['SEO', 'SEM', 'Google Analytics', 'Social Media', 'Content Strategy'],
    color: 'from-cyan-500 to-teal-600'
  },
  {
    id: 4,
    title: 'Junior Frontend Developer',
    department: 'Development',
    type: 'Full-time',
    location: 'Vadodara, India',
    salary: '₹4,00,000 - ₹6,50,000/year',
    experience: '1-3 years',
    posted: '3 days ago',
    description: 'Start your career with us! Work on modern web applications and learn from experienced developers.',
    skills: ['React', 'JavaScript', 'CSS', 'HTML', 'Git'],
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 5,
    title: 'Content Writer',
    department: 'Content',
    type: 'Full-time',
    location: 'Remote',
    salary: '₹3,50,000 - ₹5,50,000/year',
    experience: '2+ years',
    posted: '1 week ago',
    description: 'Create compelling content for our blog, social media, and marketing campaigns.',
    skills: ['Content Writing', 'SEO Writing', 'Research', 'Copywriting', 'Editing'],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 6,
    title: 'Project Manager',
    department: 'Management',
    type: 'Full-time',
    location: 'Vadodara, India',
    salary: '₹7,00,000 - ₹11,00,000/year',
    experience: '6+ years',
    posted: '4 days ago',
    description: 'Lead and coordinate projects, ensuring timely delivery and client satisfaction.',
    skills: ['Project Management', 'Agile/Scrum', 'Communication', 'Leadership', 'Risk Management'],
    color: 'from-indigo-500 to-blue-600'
  }
];

const perks = [
  { icon: '💰', title: 'Competitive Salary', description: 'Industry-leading compensation packages' },
  { icon: '🏠', title: 'Flexible Work', description: 'Remote-friendly work arrangements' },
  { icon: '📚', title: 'Learning Budget', description: 'Annual training and development allowance' },
  { icon: '🎯', title: 'Growth', description: 'Clear career progression paths' },
  { icon: '🤝', title: 'Team Culture', description: 'Collaborative and supportive environment' },
  { icon: '🎉', title: 'Benefits', description: 'Health insurance and wellness programs' }
];

export default function Careers() {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('All');

  const departments = ['All', ...new Set(jobListings.map(job => job.department))];
  const filteredJobs = selectedDepartment === 'All'
    ? jobListings
    : jobListings.filter(job => job.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark transition-colors duration-300">
      <div className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 animate-fadeInUp">
            <div className="inline-block px-4 py-2 bg-cyan-50 dark:bg-cyan-900/20 rounded-full border border-cyan-200 dark:border-cyan-800 mb-4">
              <span className="text-sm font-semibold text-cyan-700 dark:text-cyan-400">Join Our Team</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Careers at Decent Digital
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Be part of a creative team that's revolutionizing digital solutions. We're always looking for talented individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16 animate-fadeInUp animation-delay-100">
            {perks.map((perk, index) => (
              <div
                key={index}
                className="bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-white/10"
              >
                <div className="text-4xl mb-4">{perk.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{perk.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{perk.description}</p>
              </div>
            ))}
          </div>

          <div className="mb-16 animate-fadeInUp animation-delay-200">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Open Positions</h2>

            <div className="flex flex-wrap gap-3 mb-8">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${selectedDepartment === dept
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                    }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              {filteredJobs.map((job, index) => (
                <div
                  key={job.id}
                  className="group bg-white dark:bg-dark-card rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-white/10 hover:border-cyan-200 dark:hover:border-cyan-800 overflow-hidden hover:-translate-y-1 animate-fadeInUp"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${job.color}`} />

                  <div className="p-8 pl-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300">
                          {job.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Briefcase className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                            <span>{job.experience} experience</span>
                          </div>
                        </div>

                        <p className="text-gray-700 dark:text-gray-300 mb-4">{job.description}</p>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span key={skill} className="px-3 py-1 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400 rounded-lg text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col items-center lg:items-end space-y-4">
                        <div className="text-center lg:text-right">
                          <p className="text-sm text-gray-600 dark:text-gray-400">Salary</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{job.salary}</p>
                        </div>
                        <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center space-x-2 whitespace-nowrap">
                          <span>Apply Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-gray-500 dark:text-gray-500">{job.posted}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-4">Don't See Your Role?</h2>
            <p className="text-xl mb-8 text-cyan-50 max-w-2xl mx-auto">
              We're always open to talented individuals. Send us your portfolio and let's explore opportunities together.
            </p>
            <button
              onClick={() => navigate('/#contact')}
              className="px-10 py-4 bg-white text-cyan-600 rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300"
            >
              Send Your Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
