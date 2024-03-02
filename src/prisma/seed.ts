import { fakerID_ID as faker } from "@faker-js/faker";
import prisma from "../lib/prisma";

async function main() {
  await prisma.user.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.like.deleteMany();

  const createdUsers = [];
  for (let i = 0; i < 20; i++) {
    const createdUser = await prisma.user.create({
      data: {
        id: faker.string.uuid(),
        username:
          faker.person.firstName().toLowerCase() +
          "_" +
          faker.person.lastName().toLowerCase(),
        email: faker.internet.email({ provider: "example.com" }).toLowerCase(),
        password:
          "$2a$12$XH2dxxlfp/.8z7qHYqdqFOhCZMHEmQtsGpcqHawK61pFH79V1CApS",
        fullname: faker.person.fullName(),
        address: faker.location.streetAddress(),
        createdAt: faker.date.past(),
      },
    });
    createdUsers.push(createdUser); 
  }

  const createPhotos = [];
    for (let i = 0; i < createdUsers.length; i++) {
        if (createdUsers.length > 0 && createdUsers[i]) {
          const userId = createdUsers[i].id; 
          for (let j = 0; j < 1; j++) {
            const createdPhoto = await prisma.photo.create({
              data: {
                id: faker.string.uuid(),
                userId: userId,
                title: faker.lorem.words({min: 3, max:8}),
                description: faker.lorem.words(30),
                path: `/uploads/images/0_${i + 1}.webp`,
                publishedAt: faker.date.past(),
                createdAt: faker.date.past(),
              },
            });
            createPhotos.push(createdPhoto); 
          }
        }
      }
  }
  // const createdExams = [];
  // for (let i = 0; i < 25; i++) {
  //   const createdExam = await prisma.photo.create({
  //     data: {
  //       id: faker.string.uuid(),
  //       examName: faker.lorem.words(3),
  //       examDescription: faker.lorem.words(20),
  //       examDate: faker.date.soon(),
  //       examDuration: 60,
  //     },
  //   });
  //   createdExams.push(createdExam); // Menambahkan hasil operasi pembuatan ujian ke dalam array
  // }

  // const createdQuestions = [];
  // // Mendapatkan examId dari setiap ujian yang baru saja dibuat dan membuat pertanyaan
  // for (let i = 0; i < createdExams.length; i++) {
  //   if (createdExams.length > 0 && createdExams[i]) {
  //     const examId = createdExams[i].id; // Mengambil id dari ujian yang baru saja dibuat
  //     for (let j = 0; j < 25; j++) {
  //       const createdQuestion = await prisma.question.create({
  //         data: {
  //           id: faker.string.uuid(),
  //           question: faker.lorem.words({ min: 8, max: 25 }),
  //           examsId: examId, // Menggunakan examId dari ujian yang sesuai
  //         },
  //       });
  //       createdQuestions.push(createdQuestion);
  //     }
  //   }
  // }
  // const createdOptions = [];
  // for (let i = 0; i < createdQuestions.length; i++) {
  //   const questionId = createdQuestions[i].id;
  //   for (let j = 0; j < 5; j++) {
  //     // Perulangan dari 0 hingga 4 (5 opsi)
  //     const isCorrect = j === faker.number.int({ min: 0, max: 4 }); // Menghasilkan nilai acak untuk isCorrect
  //     const createdOption = await prisma.option.create({
  //       data: {
  //         id: faker.string.uuid(),
  //         option: faker.lorem.words({ min: 8, max: 15 }),
  //         isCorrect: isCorrect,
  //         questionsId: questionId,
  //       },
  //     });
  //     createdOptions.push(createdOption);
  //   }
  // }
  // const createdResults = [];
  // for (let i = 0; i < createdUsers.length; i++) {
  //   const examId = createdExams[i].id;
  //   const userId = createdUsers[i].id;

  //   for (let j = 0; j < createdExams.length; j++) {
  //     const createResult = await prisma.result.create({
  //       data: {
  //         id: faker.string.uuid(),
  //         examsId: examId,
  //         usersId: userId,
  //         totalScore: faker.number.int({ min: 0, max: 100 }),
  //         questionCorrect: faker.number.int({ min: 0, max: 25 }),
  //         questionIncorrect: faker.number.int({ min: 0, max: 25 }),
  //         questionUnanswered: faker.number.int({ min: 0, max: 25 }),
  //         createdAt: faker.date.past(),
  //       },
  //     });
  //     createdResults.push(createResult);
  //   }
  // }


main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
