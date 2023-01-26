import { Component, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { map, switchMap, tap } from 'rxjs';
import { PaisesService } from 'src/app/services/paises.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    edad: [{ value: '', disabled: true }, [Validators.required]],
    pais: ['', Validators.required],
    ciudad: ['', Validators.required],

    personas: this.fb.array([]),
    nuevaPersona: this.fb.group({
      nombreCompleto: ['', 
      // [Validators.required]
    ],
      parentesco: ['', 
      // [Validators.required]
    ],
      edad2: [{ value: '', disabled: true }, [Validators.required]],
    }),
  });
  get personasArr() {
    return this.miFormulario.get('personas') as FormArray;
  }
  public showElement(): boolean {
    return !this.personasArr.value.some(
      (x: { parentesco: string }) => x.parentesco === 'papá'
    );
  }

  // Llenar selectores
  cargando = true;
  paises: [] = [];
  ciudades: [] = [];
  parentescos = ['Esposo(a)', 'Papá', 'Mamá', 'Hijo(a)', 'Otro'];
  prueba = this.personasArr.value;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}
  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: '',
      apellido: '',
      edad: '35',
      pais: '',
      ciudad: '',
    });
    // this.miFormulario.get('edad')?.disable();

    this.paisesService
      .getPaises()
      .pipe(map((data: any) => data.data))
      .subscribe(
        (paises) =>
          (this.paises = paises.map((data: { country: any }) => data.country))
      );

    this.miFormulario
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miFormulario.get('ciudad')?.reset('');
          console.log('Cargando...');
        }),
        switchMap((pais) => this.paisesService.getCities(pais)),
        map((data: any) => data.data)
      )
      .subscribe((ciudades) => {
        console.log('Cargo...');
        console.log(ciudades);
        this.cargando = false;
        this.ciudades = ciudades;
      });
  }

  agregarPersona3() {
    console.log(this.miFormulario.get('nuevaPersona')?.value);
  }
  agregarPersona() {
    if (this.miFormulario.get('nuevaPersona')?.invalid) {
      return;
    }
    this.personasArr.push(
      new FormControl(
        {
          nombreCompleto: this.miFormulario.get('nuevaPersona')?.get('nombreCompleto')?.value,
          parentesco: this.miFormulario.get('nuevaPersona')?.get('parentesco')?.value,
          edad2: this.miFormulario.get('nuevaPersona')?.get('edad2')?.value || 18,
        },
        Validators.required
      )
    );
    // console.log('personasArr', JSON.stringify(this.personasArr.value));
    this.validateParentescos();

    this.miFormulario.get('nuevaPersona')?.reset();
  }
  validateParentescos() {
    this.validateParentesco('papá');
    this.validateParentesco('mamá');
    this.validateParentesco('esposo(a)');
  }
  borrarPersona(i: number) {
    // if(this.personasArr[i].parentesco ==='papá'){
    //   console.log("first")
    // }
    // TODO: ADD PARENTESCO
    // console.log(this.personasArr.value[i].parentesco)
    this.personasArr.removeAt(i);
  }

  submitFormulario() {
    // this.miFormulario.get('edad')?.enabled();
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

  validateParentesco(parentesco: string) {
    if (
      this.personasArr.value.some(
        (x: { parentesco: string }) => x.parentesco === parentesco
      )
    ) {
      this.parentescos = this.parentescos.filter(
        (x) => x.toLowerCase() !== parentesco
      );
    }
  }
}

