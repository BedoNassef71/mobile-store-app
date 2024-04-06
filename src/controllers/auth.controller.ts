import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../utils/dtos/sign-up.dto';
import { SignInDto } from '../utils/dtos/sign-in.dto';
import { AuthDto } from '../utils/dtos/auth.dto';

export class AuthController {
  constructor(private authService: AuthService) {}
  async signUp(req: Request, res: Response) {
    const signUpDto: SignUpDto = req.body;
    const authDto: AuthDto = await this.authService.signUp(signUpDto);
    res.status(201).json(authDto);
  }

  async signIn(req: Request, res: Response) {
    const signInDto: SignInDto = req.body;
    const authDto: AuthDto | null = await this.authService.signIn(signInDto);
    if (authDto) {
      res.status(200).json(authDto);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  }
}